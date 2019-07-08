import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class WithShare extends Taro.PureComponent {
  onShareAppMessage(res) {
    return {
      title: '我的小程序嘻嘻个嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻。。。。。。。。。。。。。',
      path: res.webViewUrl,
      imageUrl: 'https://yanxuan.nosdn.127.net/b55964645fb27f77624a02043a14315b.png'
    }
  }

  render () {
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