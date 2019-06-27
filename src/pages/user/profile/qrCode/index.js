import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import qrCode from '../assets/qr-code.png'
import './index.scss'

export default class Profile extends Component {
  static defaultProps = {
    userInfo: {}
  }

  state = {
    posterUrl: '',
    showPoster: false
  }

  constructor() {
    super(...arguments)
  }

  showPoster(e) {
    e.stopPropagation()
    this.setState({
      showPoster: true
    })
  }

  closeBox(e) {
    e.stopPropagation()
    this.setState({
      showPoster: false
    })
  }

  render () {
    const { posterUrl, showPoster } = this.state

    return (
      <View className='qrcode' onClick={this.showPoster}>
        <Image
          className='qrcode-img'
          src={qrCode}
        />

        {showPoster && 
          <View class='qrcode-imgBox'>
            <Image src={posterUrl} className='qrcode-imgBox-img' />
            <Button className='qrcode-imgBox-close' onClick={this.closeBox.bind(this)}>
              <AtIcon customStyle='margin-top: -4px;' value='close' size='18' color='#666'></AtIcon>
            </Button>
            <Button className='qrcode-imgBox-save'>保存相册，分享到朋友圈</Button>
          </View>
        }

        {showPoster && 
          <View className='qrcode-mask'></View>
        }
      </View>
    )
  }
}
