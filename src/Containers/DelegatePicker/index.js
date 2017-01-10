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
      searchName: ''
    }
  }

  componentWillReceiveProps (newProps) {
    // this.forceUpdate()

    // Did the search attempt complete?
    if (!newProps.fetching && newProps.delegateName) {
      this.props.navigatePush('delegate-info', newProps.delegateName)
    }
  }

  handleNameSubmit = () => {
    const { searchName } = this.state

    if (!searchName.trim()) {
      return this.state
    }

    this.props.pickerSearch(searchName)
  }

  onSearchNameChange = (searchName) => {
    this.setState({
      searchName
    })
  }

  render () {
    const { handleNameSubmit, fetching, pickerError } = this.props
    const { searchName } = this.state

    return (
      <Screen>
        <NavigationBar title="Who do you want to stalk?" />
        <ScrollView>

          {pickerError ? (
            <Text style={{ padding: 10, color: 'red' }}>{pickerError}</Text>
          ) : null}

          <TextInput 
            onChangeText={this.onSearchNameChange} 
            placeholder={'Delegate name'}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            // maxLength={12}
            // onSubmitEditing={this.handleNameSubmit}
            onEndEditing={this.handleNameSubmit}
            value={searchName}
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
    delegateName: state.picker.delegateName,
  }
}

const mapDispatchToProps = (dispatch) => ({
  pickerSearch: (searchName) => dispatch(PickerActions.pickerSearch(searchName)),
  navigatePush: (key, title) => dispatch(navigatePush({ key, title })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DelegatePicker)
