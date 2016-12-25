
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CardStack, NavigationBar } from '@shoutem/ui/navigation'

import { navigatePop } from '../../Redux'
import DelegatePicker from '../DelegatePicker'
import DelegateInfo from '../DelegateInfo'

class RootContainer extends Component {

  static propTypes = {
    onNavigateBack: React.PropTypes.func.isRequired,
    navigationState: React.PropTypes.object,
    scene: React.PropTypes.object,
  }

  constructor (props) {
    super(props)

    this.renderNavBar = this.renderNavBar.bind(this)
    this.renderScene = this.renderScene.bind(this)
  }

  renderScene (props) {
    const { route } = props.scene
    let Screen = null

    console.log(route);

    switch (route.key) {
      case 'delegate-picker':
        Screen = DelegatePicker
        break
      case 'delegate-info':
        Screen = DelegateInfo
        break
      default:
        Screen = DelegatePicker
        break
    }

    return (<Screen {...route.props} />)
  }

  renderNavBar (props) {
    const { onNavigateBack } = this.props

    return (
      <NavigationBar.View
        {...props}
        onNavigateBack={onNavigateBack}
      />
    )
  }

  render () {
    const { navigationState, onNavigateBack } = this.props

    return (
      <CardStack
        navigationState={navigationState}
        onNavigateBack={onNavigateBack}
        renderNavBar={this.renderNavBar}
        renderScene={this.renderScene}
      />
    )
  }

}


const mapStateToProps = (state) => {
  return {
    navigationState: state.navigationState
  }
}

const mapDispatchToProps = {
  onNavigateBack: navigatePop,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
