import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { TapBar, Login } from '@components'

@inject('cart')
@inject('app')
@inject('user')
@observer
export default class WithLogin extends Taro.PureComponent {
  render () {
    const { user: { userInfo }, app: { enableHideBar } } = this.props

    if (!userInfo.login) {
      return (
        <View className={'user page-con ' + (enableHideBar ? '' : 'no-tab-bar')}>
          <Login />

          <TapBar></TapBar>
        </View>
      )
    }

    return (
      <View>
        { this.props.children }
      </View>
    )
  }
}
// export default ({ children, login, enableHideBar }) => {
//   if (!login) {
//     return (
//       <View className={'user page-con ' + (enableHideBar ? '' : 'no-tab-bar')}>
//         <Login />

//         <TapBar></TapBar>
//       </View>
//     )
//   }

//   return <View>{children}</View>
// }