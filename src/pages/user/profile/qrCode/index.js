import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ShareActionSheet } from '@components'
import qrCode from '../assets/qr-code.png'
import './index.scss'

export default class Profile extends Component {
  state = {
    actionSheetVisible: false
  }

  constructor() {
    super(...arguments)
  }

  handleActionSheetClose() {
    this.setState({
      actionSheetVisible: false
    })
  }

  openActionSheet() {
    this.setState({
      actionSheetVisible: true
    })
  }

  render () {
    const { actionSheetVisible } = this.state

    return (
      <View className='qrcode'>
        <Image
          onClick={this.openActionSheet}
          className='qrcode-img'
          src={qrCode}
        />

        <ShareActionSheet
          forShareMP
          visible={actionSheetVisible}
          onClose={this.handleActionSheetClose.bind(this)}
        />
      </View>
    )
  }
}
