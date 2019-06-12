import Taro, { Component } from '@tarojs/taro'
import { AtTabBar }  from 'taro-ui'

import './index.scss'

export default class TapBar extends Component {

  config = {
    // navigationBarTitleText: '蜜折VIP'
  }

  state = {
    active: 0
  }

  async componentDidMount() {
    
  }

  componentWillMount () { }

  componentWillReact () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // event.detail 的值为当前选中项的索引
  onChange(index) {
    const url = [
      '/pages/home/home', '/pages/cart/cart', '/pages/user/user'
    ][index || 0]
    Taro.navigateTo({ url })
  }

  render () {
    return (
      <AtTabBar
        fixed
        tabList={[
          { title: '首页', iconType: 'home', iconType: 'clock', text: 'new' },
          { title: '结算', iconType: 'shopping-cart' },
          { title: '个人', iconType: 'user', text: '100', max: '99' }
        ]}
        onClick={this.onChange.bind(this)}
        current={this.state.active}
      />
    )
  }
}
