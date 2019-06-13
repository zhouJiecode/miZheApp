import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { TapBar } from '@components'
import { observer, inject } from '@tarojs/mobx'
import { getWindowHeight } from '@utils/style'
import Profile from './profile'
// import Menu from './menu'
import Opers from './opers'
import Activity from './activity'
import './user.scss'

@inject('user')
@inject('cart')
@observer
class User extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  componentDidShow() {
    const { user, cart } = this.props

    user.dispatchUser()
    cart.dispatchCartNum()
  }

  handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/user-login/user-login'
    })
  }

  render () {
    const { userInfo } = this.props

    return (
      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{ height: getWindowHeight() }}
        >
          <Profile userInfo={userInfo} />
          <Opers></Opers>
          {/* <Menu />
          {userInfo.login &&
            <View className='user__logout' onClick={this.handleLogin}>
              <Text className='user__logout-txt'>切换账号</Text>
            </View>
          }
          <View className='user__empty' /> */}
        </ScrollView>
        <View className='user__activity'>
          <Activity />
        </View>
        <TapBar></TapBar>
      </View>
    )
  }
}

export default User
