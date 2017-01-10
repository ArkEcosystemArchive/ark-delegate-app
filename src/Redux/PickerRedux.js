// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Config from '../Config'

/* ------------- Types and Action Creators ------------- */

const pickerSearch = (seachName) => {
  return (dispatch) => {
    let delegateName = ''
    let address = ''
    let pubKey = ''

    dispatch(Creators.pickerRequest(seachName))

    return fetch(Config.explorerURL + '/api/getSearch?q=' + seachName)
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.success) {
          throw responseJson.error
        }
        address = responseJson.address
        return fetch(Config.explorerURL + '/api/getAccount?address=' + address)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        delegateName = responseJson.delegate.username
        pubKey = responseJson.publicKey
        dispatch(Creators.pickerSuccess(delegateName, address, pubKey))
      })
      .catch((error) => {
        dispatch(Creators.pickerFailure(error))
      })
  }
}

const { Types, Creators } = createActions({
  pickerSearch,
  pickerRequest: ['searchName'],
  pickerSuccess: [ 'delegateName', 'address', 'pubKey'],
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
export const request = (state: Object, { searchName }: Object) => {
  return state.merge({ 
    fetching: true,
  })
}

// we've successfully logged in
export const success = (state: Object, { delegateName, address, pubKey }: Object) => {
  console.log('success!', delegateName, address, pubKey)
  return state.merge({ fetching: false, error: null, delegateName, address, pubKey })
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
