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
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      navigatePop()
    }
  }

  handleNameSubmit = () => {
    const { delegateName } = this.state

    if (!delegateName.trim()) {
      return this.state
    }

    this.isAttempting = true
    this.props.pickerSearch(delegateName)
  }

  onDelegateNameChange = (delegateName) => {
    this.setState({
      delegateName
    })
  }

  render () {
    const { handleNameSubmit } = this.props;
    const { delegateName } = this.state;

    return (
      <Screen>
        <NavigationBar title="Who do you want to stalk?" />
        <ScrollView>

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
            <Text>Go</Text>
          </Button>
          <Divider styleName="line" />

        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.picker.fetching
  }
}

const mapDispatchToProps = (dispatch) => ({
  pickerSearch: (delegateName) => dispatch(PickerActions.pickerSearch(delegateName))
})

export default connect(mapStateToProps, mapDispatchToProps)(DelegatePicker)
