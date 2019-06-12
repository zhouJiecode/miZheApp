import Taro, { Component } from '@tarojs/taro'

import './index.scss'

class Index extends Component {

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
  onChange(event) {
    console.log(event.detail)
  }

  render () {
    const { active } = this.state

    return (
      <van-tabbar active={active} change={this.onChange}>
        <van-tabbar-item icon='home-o'>标签</van-tabbar-item>
        <van-tabbar-item icon='search' dot>标签</van-tabbar-item>
        <van-tabbar-item icon='friends-o' info='5'>标签</van-tabbar-item>
      </van-tabbar>
    )
  }
}

export default Index 
