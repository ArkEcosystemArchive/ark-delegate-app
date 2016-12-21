// @flow

import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'

class HomeContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      delegateName: 'doweig',
    }
  }

  render () {
    return (
      <View>
        <Text>
          Hello {this.state.delegateName}, welcome to Ark!
        </Text>
      </View>
    )
  }
}

export default HomeContainer
// export default connect(null, null)(HomeContainer)
