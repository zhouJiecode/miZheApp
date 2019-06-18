import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import defaultAvatar from '@assets/default-avatar.png'
import qrCode from './assets/qr-code.png'
import './index.scss'

export default class Profile extends Taro.PureComponent {
  static defaultProps = {
    userInfo: {}
  }

  handleLogin = () => {
    // if (!this.props.userInfo.login) {
    //   Taro.navigateTo({
    //     url: '/pages/user-login/user-login'
    //   })
    // }
  }

  getUid = (uid) => {
    if (!uid || !/@/.test(uid)) {
      return ''
    }
    const [username, suffix] = uid.split('@')
    const firstLetter = username[0]
    const lastLetter = username[username.length - 1]
    return `${firstLetter}****${lastLetter}@${suffix}`
  }

  render () {
    const { userInfo } = this.props
    // avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzQ47l2RKcDfyJ96Lfs2JyuDvy7W7Pqx8ulNpnQeGAtEotOTdWHCYHkibjZ3tuKV6O4bxEsGh9D4g/132",
    // city: "Nanjing",
    // country: "China",
    // gender: 1,
    // language: "zh_CN",
    // nickName: "周杰",
    // province: "Jiangsu",
    return (
      <View className='user-profile'>
        {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
        {/* <Image
          className='user-profile__bg'
          src={bg}
          mode='widthFix'
        /> */}

        <View className='user-profile__wrap'>
          <View className='user-profile__avatar'>
            <Image
              className='user-profile__avatar-img'
              src={userInfo.avatarUrl || defaultAvatar}
              onClick={this.handleLogin}
            />
          </View>

          <View className='user-profile__info' onClick={this.handleLogin}>
            <Text className='user-profile__info-name'>
              {userInfo.login ? userInfo.nickName : '未登录'}
            </Text>
            {
              <View className='user-profile__info-tip'>
                <AtIcon className='font32 mr5 lineH50' value='star-2' color='#E6D1A2'></AtIcon>
                <Text className='user-profile__info-tip-text'>蜜折小当家</Text>
              </View>
            }
          </View>

          <View className='user-profile__extra'>
            <Image
              className='user-profile__extra-img'
              src={qrCode}
            />
          </View>

          {/* <Vip /> */}
        </View>
      </View>
    )
  }
}
