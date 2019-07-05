import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { Share } from '@components'
// import closePng from '@assets/close.png'
import weixinPng from '@assets/weixin.png'
import haibaoPng from '@assets/haibao.png'
import classNames from 'classnames'
import './index.scss'

export default class InfoBase extends Taro.PureComponent {
  static defaultProps = {
    visible: false,
    onClose: () => {}
  }

  close() {
    this.props.onClose()
  }

  render () {
    const rootClass = classNames(
      'action-sheet',
      {
        'action-sheet--active': this.props.visible,
      }
    )

    return (
      <View className={rootClass}>
        <View onClick={this.close.bind(this)} className='action-sheet__overlay' />
        <Share></Share>
        <View className='action-sheet-container'>
          <View className='action-sheet-head'>
            <Text className='action-sheet-head-title'>分享给好友</Text>
            <AtIcon
              value='close'
              customStyle='position:absolute;right: 30px;top: 20px;'
              size='20'
              color='#666'
            />
            {/* <Image src={closePng} className='action-sheet-head-close' /> */}
          </View>
          <View className='action-sheet-body'>
            <Button className='action-sheet-body-item' open-type='share'>
              <Image src={weixinPng} className='action-sheet-body-item-img' />
              微信
            </Button>

            <View className='action-sheet-body-item'>
              <Image src={haibaoPng} className='action-sheet-body-item-img' />
              生成海报
            </View>
          </View>
        </View>
      </View>
    )
  }
}
