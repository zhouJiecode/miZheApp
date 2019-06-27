import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { TapBar } from '@components'
import { observer, inject } from '@tarojs/mobx'
import Profile from './profile'
import Opers from './opers'
import './user.scss'

@inject('user')
@inject('cart')
@inject('app')
@observer
class User extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor(props) {
    super(props)
  }

  componentDidShow() {
    const { user, cart } = this.props

    user.dispatchUser()
    cart.dispatchCartNum()
  }

  render () {
    const { user: { userInfo }, app: { enableHideBar } } = this.props
    // fixbug: 这里必须使用一次userInfo内部的变量，否则userInfo内部变量更新时，这里不会同步更新
    userInfo.nickName

    return (
      <View className={'user page-con ' + (enableHideBar ? '' : 'no-tab-bar')}>
        <ScrollView
          scrollY
          className='user__wrap'
        >
          <Profile userInfo={userInfo} />
          <Opers></Opers>
        </ScrollView>
        {/* <View className='user__activity'>
          <Activity />
        </View> */}
        <TapBar></TapBar>
      </View>
    )
  }
}

export default User
