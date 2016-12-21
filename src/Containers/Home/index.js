// @flow

import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Heading, NavigationBar, Title } from '@shoutem/ui'

class HomeContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      delegateName: 'doweig',
    }

    this.getDelegateInfo()
  }

  getDelegateInfo = () => {
    return fetch('https://explorer.lisk.io/api/getSearch?q=' + this.state.delegateName)
      .then((response) => response.json())
      .then((responseJson) => fetch('https://explorer.lisk.io/api/getAccount?address=' + responseJson.address))
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <View>
        <View>
          <NavigationBar
            hasHistory
            centerComponent={<Title>{this.state.delegateName}</Title>}
          />
        </View>
        <View>
          <Text>
            Hello {this.state.delegateName}, welcome to Ark!
          </Text>
        </View>
      </View>
    )
  }
}

export default HomeContainer
// export default connect(null, null)(HomeContainer)
