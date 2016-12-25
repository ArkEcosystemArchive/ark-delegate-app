
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

  getDelegateInfo = () => {
    const { delegateName } = this.props
    // const delegateName = 'doweig'

    return fetch('http://10.10.11.56:6040/api/getSearch?q=' + delegateName)
      .then((response) => response.json())
      .then((responseJson) => fetch('http://10.10.11.56:6040/api/getAccount?address=' + responseJson.address))
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const { delegateName } = this.props

    this.getDelegateInfo()

    return (
      <Screen styleName="paper full-screen">
        <NavigationBar
          title={delegateName}
          styleName="clear"
          animationName="solidify"
        />


        <Text>Hey</Text>
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
    delegateName: state.navigationState.routes[1].props.delegateName,
  }
}

// const mapDispatchToProps = {
//   onNavigateBack: navigatePop,
// }

export default connect(mapStateToProps, null)(DelegateInfo)
