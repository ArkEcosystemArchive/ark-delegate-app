// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Config from '../Config'

/* ------------- Types and Action Creators ------------- */

const pickerSearch = (delegateName) => {
  return (dispatch) => {
    let address = ''
    let pubKey = ''

    dispatch(Creators.pickerRequest(delegateName))

    return fetch(Config.explorerURL + '/api/getSearch?q=' + delegateName)
      .then((response) => response.json())
      .then((responseJson) => {
        address = responseJson.address
        console.log(Config.explorerURL + '/api/accounts/getPublicKey?address=' + address)
        
        return fetch(Config.explorerURL + '/api/accounts/getPublicKey?address=' + address)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        pubKey = responseJson.publicKey
        dispatch(Creators.pickerSuccess(address, pubKey))
      })
      .catch((error) => {
        console.log(error)
        dispatch(Creators.pickerFailure(error))
      })
  }
}

const { Types, Creators } = createActions({
  pickerSearch,
  pickerRequest: ['delegateName'],
  pickerSuccess: ['address', 'pubKey'],
  pickerFailure: ['error'],
  pickerClear: null
})

export const DelegatePickerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  delegateName: null,
  error: null,
  fetching: false,
  address: null,
  pubKey: null,
})

/* ------------- Reducers ------------- */

// we're attempting to get the delegate info
export const request = (state: Object, { delegateName }: Object) => {
  return state.merge({ 
    fetching: true,
    delegateName
  })
}

// we've successfully logged in
export const success = (state: Object, { address, pubKey }: Object) => {
  console.log('success!', address, pubKey)
  return state.merge({ fetching: false, error: null, address, pubKey })
}

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) => {
  console.log('error!', error)
  return state.merge({ fetching: false, error })
}

// we've logged out
export const clear = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PICKER_REQUEST]: request,
  [Types.PICKER_SUCCESS]: success,
  [Types.PICKER_FAILURE]: failure,
  [Types.PICKER_CLEAR]: clear
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isPicked = (pickerState: Object) => pickerState.address !== null
