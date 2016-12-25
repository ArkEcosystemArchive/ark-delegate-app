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

import { navigatePush } from '../../Redux'

class DelegatePicker extends Component {

  static propTypes = {
    nameSubmit: React.PropTypes.func,
  }

  constructor (props) {
    super(props)

    this.state = {
      delegateName: ''
    }
  }

  handleNameSubmit = () => {
    this.props.nameSubmit(this.state.delegateName)
  }

  onDelegateNameChange = (delegateName) => {
    this.setState({
      delegateName
    })
  }

  render () {
    const { handleNameSubmit } = this.props;

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

const mapDispatchToProps = (dispatch) => ({
  nameSubmit: (delegateName) => {
    dispatch(navigatePush({
      key: 'delegate-info',
    }, { delegateName }))
  },
})

export default connect(null, mapDispatchToProps)(DelegatePicker)
