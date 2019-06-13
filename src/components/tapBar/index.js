import Taro from '@tarojs/taro'
import { AtTabBar }  from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('tabbar')
@observer
export default class TapBar extends Taro.PureComponent {

  config = {
    // navigationBarTitleText: '蜜折VIP'
  }

  componentDidMount() {}

  componentWillMount () { }

  componentWillReact () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // event.detail 的值为当前选中项的索引
  onChange(index) {
    const { tabbar } = this.props
    const url = [
      '/pages/home/home', '/pages/cart/cart', '/pages/user/user'
    ][index || 0]

    tabbar.setActiveTab(index)
    Taro.switchTab({ url })
  }

  render () {
    const { tabbar: { activeTab } } = this.props

    return (
      <AtTabBar
        fixed
        tabList={[
          { title: '首页', iconType: 'home', iconType: 'clock', text: 'new' },
          { title: '结算', iconType: 'shopping-cart' },
          { title: '个人', iconType: 'user', text: '100', max: '99' }
        ]}
        onClick={this.onChange.bind(this)}
        current={activeTab}
      />
    )
  }
}
