import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import defaultAvatar from '@assets/default-avatar.png'
import qrCode from './assets/qr-code.png'
import './index.scss'

export default class Profile extends Component {
  static defaultProps = {
    userInfo: {}
  }

  constructor() {
    super(...arguments)
  }

  render () {
    const { userInfo: { avatarUrl, nickName, login } } = this.props

    return (
      <View className='user-profile'>
        <View className='user-profile__wrap'>
          <View className='user-profile__avatar'>
            <Image
              className='user-profile__avatar-img'
              src={avatarUrl || defaultAvatar}
            />
          </View>

          <View className='user-profile__info'>
            <Text className='user-profile__info-name'>
              {login ? nickName : '未登录'}
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
