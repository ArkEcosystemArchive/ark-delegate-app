import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ListView,
  Tile,
  Title,
  Subtitle,
  TouchableOpacity,
  Screen,
  Divider,
  ScrollView,
  TextInput,
  Button,
  Text,
  Spinner,
} from '@shoutem/ui'
import { NavigationBar } from '@shoutem/ui/navigation'

import { navigatePush, navigatePop } from '../../Redux'
import PickerActions from '../../Redux/PickerRedux'

class DelegatePicker extends Component {

  static propTypes = {
    nameSubmit: React.PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      delegateName: 'doweig'
    }
    // this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    // this.forceUpdate()
    // Did the login attempt complete?
    // if (this.isAttempting && !newProps.fetching) {
    if (!newProps.fetching && newProps.pubKey) {
      this.props.navigatePush('delegate-info', this.state.delegateName)
    }
  }

  handleNameSubmit = () => {
    const { delegateName } = this.state

    if (!delegateName.trim()) {
      return this.state
    }

    // this.isAttempting = true
    this.props.pickerSearch(delegateName)
  }

  onDelegateNameChange = (delegateName) => {
    this.setState({
      delegateName
    })
  }

  render () {
    const { handleNameSubmit, fetching, pickerError } = this.props
    const { delegateName } = this.state

    console.log(pickerError)

    return (
      <Screen>
        <NavigationBar title="Who do you want to stalk?" />
        <ScrollView>

          {pickerError ? (
            <Text style={{ padding: 10, color: 'red' }}>{pickerError}</Text>
          ) : null}

          <TextInput 
            onChangeText={this.onDelegateNameChange} 
            placeholder={'Delegate name'}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            // maxLength={12}
            // onSubmitEditing={this.handleNameSubmit}
            onEndEditing={this.handleNameSubmit}
            value={delegateName}
          />
          <Divider styleName="line" />

          <Button>
            { fetching ? (
              <Spinner />
            ) : (
              <Text>Go</Text>
            ) }
          </Button>
          <Divider styleName="line" />

        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.picker.fetching,
    pickerError: state.picker.error,
    pubKey: state.picker.pubKey,
  }
}

const mapDispatchToProps = (dispatch) => ({
  pickerSearch: (delegateName) => dispatch(PickerActions.pickerSearch(delegateName)),
  navigatePush: (key, title) => dispatch(navigatePush({ key, title })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DelegatePicker)
