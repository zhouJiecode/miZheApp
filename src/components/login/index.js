import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import defaultAvatar from '@assets/default-avatar.png'
import './index.scss'

@inject('user')
@observer
export default class Login extends Taro.PureComponent {
  static defaultProps = {
    object: '个人',
    imgSrc: defaultAvatar
  }

  onGetUserInfo({ currentTarget: { userInfo } }) {
    this.props.user.setUserInfo({ ...userInfo })
  }

  render () {
    const { object, imgSrc } = this.props

    return (
      <View className='login'>
        <Image
          className='login-img'
          src={imgSrc}
        />
        <Text className='login-txt'>登录之后就能看到{object}了哦~</Text>
        <Button open-type='getUserInfo' className='login-btn' onGetUserInfo={this.onGetUserInfo}>
          登录
        </Button>
      </View>
    )
  }
}
