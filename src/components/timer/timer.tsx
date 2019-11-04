import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { IProps, IState } from './interface'

import './timer.scss'

export default class Timer extends Component<IProps, IState> {

  tick (diffTime: number) {
    if (diffTime < 1000) {
      this.props.onTimeup && this.props.onTimeup()
      return
    }
    setTimeout(() => {
      diffTime = diffTime - 1000
      this.props.onTick && this.props.onTick(Math.floor(diffTime / 1000))
      this.computeTime(diffTime)
    }, 1000)
  }

  componentWillMount () {
    const { endTime, startTime } = this.props
    const diffTime = endTime - startTime
    this.computeTime(diffTime)
  }

  computeTime (diffTime: number) {
    const sec = Math.floor(diffTime / 1000)
    const remainHour = Math.floor(sec / 3600)
    const remainMin = Math.floor((sec - remainHour * 3600) / 60)
    const remainSec = sec - remainHour * 3600 - remainMin * 60
    this.setState({
      remainHour,
      remainMin,
      remainSec
    }, () => {
      this.tick(diffTime)
    })
  }

  render () {
    const { remainHour, remainMin, remainSec } = this.state
    return (
      <View className='timer'>
        <Text>{remainHour}:{remainMin}:{remainSec}</Text>
      </View>
    )
  }
}
