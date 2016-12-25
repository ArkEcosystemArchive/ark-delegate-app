
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ScrollView,
  Icon,
  Row,
  Subtitle,
  Text,
  Title,
  View,
  Image,
  Divider,
  Tile,
  Screen,
} from '@shoutem/ui'
import { NavigationBar } from '@shoutem/ui/navigation'

class DelegateInfo extends Component {

  static propTypes = {
    delegateName: React.PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.state = {
      // delegateName: props.delegateName,
      delegateName: 'doweig',
      fetching: false,
      account: null,
    }

  }

  componentDidMount () {
    this.getDelegateInfo()
  }

  getDelegateInfo = () => {
    const { delegateName } = this.state

    this.setState({ ...this.state, fetching: true })

    return fetch('http://10.10.11.56:6040/api/getSearch?q=' + delegateName)
      .then((response) => response.json())
      .then((responseJson) => fetch('http://10.10.11.56:6040/api/getAccount?address=' + responseJson.address))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          ...this.state,
          fetching: false, 
          account: responseJson,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const { fetching, delegateName, account } = this.state

    if (fetching || !account) {
      return (
        <Screen>
          <Text>Loading...</Text>
        </Screen>
      )
    }

    return (

      <Screen>
        <NavigationBar title={delegateName} />
        <ScrollView>
          
          <Screen styleName="paper">

            <Row>
              <View>
                <Subtitle>Address</Subtitle>
                <Text>{account.address}</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            
            <Row>
              <View>
                <Subtitle>Public Key</Subtitle>
                <Text>{account.publicKey}</Text>
              </View>
            </Row>
            <Divider styleName="line" />

            <Row>
              <View>
                <Subtitle>Produced Blocks</Subtitle>
                <Text>{account.delegate.producedblocks}</Text>
              </View>
            </Row>
            <Divider styleName="line" />

            <Row>
              <View>
                <Subtitle>Missed Blocks</Subtitle>
                <Text>{account.delegate.missedblocks}</Text>
              </View>
            </Row>
            <Divider styleName="line" />

          </Screen>

        </ScrollView>
      </Screen>
    )
    //     <ScrollView>
    //       <Image
    //         styleName="large-portrait hero"
    //         animationName="hero"
    //         source={{ uri: restaurant.image && restaurant.image.url }}
    //         key={restaurant.name}
    //       >
    //         <Tile animationName="hero">
    //           <Title>{restaurant.name}</Title>
    //           <Subtitle>{restaurant.address}</Subtitle>
    //         </Tile>
    //       </Image>

    //       <Screen styleName="paper">
    //         <Text styleName="md-gutter multiline">{restaurant.description}</Text>

    //         <Divider styleName="line" />

    //         <Row>
    //           <Icon name="laptop" />
    //           <View styleName="vertical">
    //             <Subtitle>Visit webpage</Subtitle>
    //             <Text numberOfLines={1}>{restaurant.url}</Text>
    //           </View>
    //           <Icon styleName="disclosure" name="right-arrow" />
    //         </Row>

    //         <Divider styleName="line" />

    //         <Row>
    //           <Icon name="pin" />
    //           <View styleName="vertical">
    //             <Subtitle>Address</Subtitle>
    //             <Text numberOfLines={1}>{restaurant.address}</Text>
    //           </View>
    //           <Icon styleName="disclosure" name="right-arrow" />
    //         </Row>

    //         <Divider styleName="line" />

    //         <Row>
    //           <Icon name="email" />
    //           <View styleName="vertical">
    //             <Subtitle>Email</Subtitle>
    //             <Text numberOfLines={1}>{restaurant.mail}</Text>
    //           </View>
    //         </Row>

    //         <Divider styleName="line" />
    //       </Screen>
    //     </ScrollView>
    //   </Screen>
    // )
  }
}

const mapStateToProps = (state) => {
  return {
    // delegateName: state.navigationState.routes[1].props.delegateName,
  }
}

// const mapDispatchToProps = {
//   onNavigateBack: navigatePop,
// }

export default connect(mapStateToProps, null)(DelegateInfo)
