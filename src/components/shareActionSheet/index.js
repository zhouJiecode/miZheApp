import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtIcon, AtToast } from 'taro-ui'
import { Share } from '@components'
import weixinPng from '@assets/weixin.png'
import haibaoPng from '@assets/haibao.png'
import downloadPng from '@assets/download2.png'
import classNames from 'classnames'
import './index.scss'

export default class ShareActionSheet extends Taro.PureComponent {
  static defaultProps = {
    visible: false,
    forShareMP: false, // true 分享小程序本身 false 分享商品
    onClose: () => {}
  }

  state = {
    posterShown: false,
    showToast: false,
    managing: false
  }

  componentWillUpdate({ forShareMP, visible: nextVisible }) {
    const { visible } = this.props
    if (nextVisible && forShareMP && !visible) {
      this.mngPoster()
    }
  }

  close() {
    this.shareObj.closeBox()
    this.props.onClose()
    this.setState({
      posterShown: false
    })
  }

  mngPoster() {
    if (this.state.managing) return
    this.setState({
      managing: true
    })
    this.shareObj.mngPoster()
  }

  onPosterShown() {
    this.setState({
      posterShown: true,
      managing: false
    })
  }

  onError() {
    this.setState({
      managing: false
    })
  }

  onSaved() {
    console.log('onSaved')
    // this.setState({
    //   showToast: true
    // })
  }

  hideToast() {
    this.setState({
      showToast: false
    })
  }

  saveShareImg() {
    this.shareObj.saveShareImg()
  }

  render () {
    const { posterShown, showToast } = this.state
    console.log('showToast:' + showToast)
    const rootClass = classNames(
      'action-sheet',
      {
        'action-sheet--active': this.props.visible,
      }
    )

    return (
      <View className={rootClass}>
        <View onClick={this.close.bind(this)} className='action-sheet__overlay' />
        <Share
          forShareMP={this.props.forShareMP}
          ref={node => this.shareObj = node}
          onPosterShown={this.onPosterShown.bind(this)}
          onSaved={this.onSaved.bind(this)}
          onError={this.onError.bind(this)}
        />
        <View className='action-sheet-container'>
          <View className='action-sheet-head'>
            <Text className='action-sheet-head-title'>分享给好友</Text>
            <AtIcon
              value='close'
              customStyle='position:absolute;right: 15px;top: 13px;'
              size='14'
              color='#999'
              onClick={this.close.bind(this)}
            />
          </View>
          <View className='action-sheet-body'>
            <View className='action-sheet-body-item'>
              <Image src={weixinPng} className='action-sheet-body-item-img' />
              微信
              <Button className='action-sheet-body-item-share' open-type='share'></Button>
            </View>

            {!posterShown &&
              <View className='action-sheet-body-item' onClick={this.mngPoster.bind(this)}>
                <Image src={haibaoPng} className='action-sheet-body-item-img' />
                生成海报
              </View>
            }

            {posterShown &&
              <View className='action-sheet-body-item' onClick={this.saveShareImg.bind(this)}>
                <Image src={downloadPng} className='action-sheet-body-item-img' />
                保存本地
              </View>
            }
          </View>
        </View>

        <AtToast
          isOpened={showToast}
          text='保存成功，快去分享吧~'
          icon='check-circle'
          onClose={this.hideToast.bind(this)}
        />
      </View>
    )
  }
}
