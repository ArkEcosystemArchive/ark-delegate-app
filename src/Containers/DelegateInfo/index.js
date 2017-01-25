
import React, { Component } from 'react'
import { connect } from 'react-redux'
import humanizeDuration from 'humanize-duration'

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

import ReactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

import CONST from '../../Helpers/Const'
import Config from '../../Config'
import { getTSFromEpochStamp, getDiffInSeconds } from '../../Helpers/Date'
import { navigatePush, navigatePop } from '../../Redux'

class DelegateInfo extends Component {

  static propTypes = {
    delegateName: React.PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.state = {
      firstFetchDone: false,
      lastFetchAt: 0,
      lastFetchAtHuman: '',

      account: null,
      lastBlock: null,
      lastBlockAtHuman: '',

      nextForgerPosition: 0,
      nextBlockAtHuman: '',
    }
  }

  componentDidMount () {
    this.getDelegateInfo()
    .then(() => {
      this.setInterval(this.refreshAtHuman, 1000)
      this.setInterval(this.getDelegateInfo, 10 * 1000)
    })
  }

  startLastBlockTimeRefresher = () => {
    setInterval(() => {
      if (!this.state.firstFetchDone) {
        return
      }

      this.refreshAtHuman()
    }, 1000)
  }

  refreshAtHuman = () => {
    const now = new Date
    this.setState({
      ...this.state,
      lastBlockTimeHuman: humanizeDuration(getDiffInSeconds(now, this.state.lastBlock.forgedAt)),
      nextBlockTimeHuman: humanizeDuration(getDiffInSeconds(
        now,
        this.state.lastBlock.forgedAt + (this.state.nextForgerPosition * CONST.BLOCKTIME_IN_SECONDS * 1000)
      )),
      lastFetchAtHuman: humanizeDuration(getDiffInSeconds(this.state.lastFetchAt, now)),
    })
  }

  getDelegateInfo = () => {
    return fetch(Config.explorerURL + '/api/getAccount?address=' + this.props.address)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          ...this.state,
          account: responseJson,
        })
      })
      .then((responseJson) => fetch(Config.explorerURL + '/api/delegates/getLastBlocks?publicKey=' + this.state.account.publicKey + '&limit=1&offset=0&orderBy=height:desc'))
      .then((response) => response.json())
      .then((responseJson) => {
        const { blocks } = responseJson
        let lastBlock = blocks[0]
        let forgedAt = getTSFromEpochStamp(lastBlock.timestamp)
        lastBlock.forgedAt = forgedAt
        this.setState({
          ...this.state,
          lastBlock: lastBlock,
        })
      })
      .then((responseJson) => fetch(Config.explorerURL + '/api/delegates/getNextForgers'))
      .then((response) => response.json())
      .then((responseJson) => {
        const { delegates } = responseJson
        this.setState({
          ...this.state,
          nextForgerPosition: delegates.indexOf(this.state.account.publicKey),
        })
        this.setState({
          ...this.state,
          firstFetchDone: true,
          lastFetchAt: new Date,
        })
        this.refreshAtHuman()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const state = this.state
    
    if (!state.firstFetchDone) {
      return (
        <Screen>
          <Text>Loading...</Text>
        </Screen>
      )
    }

    return (
      <Screen>
        <NavigationBar title={this.props.delegateName} />
        <ScrollView style={{ marginTop: -45 }}>
          
          <Screen styleName="paper">

            {/* Debug helper */}
            <Row>
              <View>
                <Text style={{ fontSize: 12 }}>(Refreshed {state.lastFetchAtHuman} ago)</Text>
              </View>
            </Row>
            <Divider styleName="line" />

            {/* Forging Section */}
            <Row>
              <View>
                <Title>Forging</Title>
              </View>
            </Row>
            <Row>
              <View>
                <Subtitle>Last forged block</Subtitle>
                <Text>{state.lastBlockTimeHuman} ago</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            <Row>
              <View>
              <Subtitle>Next forged block (estimation)</Subtitle>
                <Text>in {state.nextBlockTimeHuman}</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            <Row>
              <View>
                <Subtitle>Forged</Subtitle>
                <Text>{state.account.delegate.forged / 100000000} ARK</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            <Row>
              <View>
                <Subtitle>Productivity (Blocks Missed / Produced)</Subtitle>
                <Text>{state.account.delegate.productivity} % ({state.account.delegate.missedblocks} / {state.account.delegate.producedblocks})</Text>
              </View>
            </Row>
            <Divider styleName="line" />

            {/* Popularity Section */}
            <Row>
              <View>
                <Title>Popularity</Title>
              </View>
            </Row>
            <Row>
              <View>
                <Subtitle>Approval</Subtitle>
                <Text>{state.account.delegate.approval} %</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            <Row>
              <View>
                <Subtitle>Position</Subtitle>
                <Text>{state.account.delegate.rate} / {CONST.ACTIVE_DELEGATES}</Text>
              </View>
            </Row>
            <Divider styleName="line" />

            {/* Account Section */}
            <Row>
              <View>
                <Title>Account</Title>
              </View>
            </Row>
            <Row>
              <View>
                <Subtitle>Delegate Name</Subtitle>
                <Text>{state.account.delegate.username}</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            <Row>
              <View>
                <Subtitle>Balance</Subtitle>
                <Text>{state.account.balance / 100000000} ARK</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            <Row>
              <View>
                <Subtitle>Address</Subtitle>
                <Text>{state.account.delegate.address}</Text>
              </View>
            </Row>
            <Divider styleName="line" />
            <Row>
              <View>
                <Subtitle>Public Key</Subtitle>
                <Text>{state.account.delegate.publicKey}</Text>
              </View>
            </Row>
            <Divider styleName="line" />

            {/* Voted By Section */}
            <Row>
              <View>
                <Title>Voted By</Title>
              </View>
            </Row>
            {state.account.voters ? state.account.voters.map((voter, i) => {
              return (
                <View key={voter.publicKey}>
                  <Row>
                    <View>
                      <Subtitle>{voter.username || voter.address}</Subtitle>
                      <Text>{voter.balance / 100000000} ARK</Text>
                    </View>
                  </Row>
                  <Divider styleName="line" />
                </View>
              )
            }) : (
              <View>
                <Row>
                  <View>
                    <Text>Empty</Text>
                  </View>
                </Row>
                <Divider styleName="line" />
              </View>
            )}

            {/* Voted For Section */}
            <Row>
              <View>
                <Title>Voted For</Title>
              </View>
            </Row>
            {state.account.votes ? state.account.votes.map((votee, i) => {
              return (
                <View key={votee.publicKey}>
                  <Row>
                    <View>
                      <Subtitle>{votee.username || votee.address}</Subtitle>
                    </View>
                  </Row>
                  <Divider styleName="line" />
                </View>
              )
            }) : (
              <View>
                <Row>
                  <View>
                    <Text>Empty</Text>
                  </View>
                </Row>
                <Divider styleName="line" />
              </View>
            )}

          </Screen>

        </ScrollView>
      </Screen>
    )
  }
}

ReactMixin.onClass(DelegateInfo, TimerMixin)

const mapStateToProps = (state) => {
  return {
    delegateName: state.picker.delegateName,
    address: state.picker.address,
    pubKey: state.picker.pubKey,
  }
}

const mapDispatchToProps = {
  navigatePop: () => dispatch(navigatePop()),
}


export default connect(mapStateToProps, null)(DelegateInfo)
