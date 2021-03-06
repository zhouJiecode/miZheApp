import Taro, { Component } from '@tarojs/taro'
import { View, Image, Canvas } from '@tarojs/components'
// import { AtIcon } from 'taro-ui'
import { downLoadFile } from '@utils'
import { observer, inject } from '@tarojs/mobx'
import defaultAvatar from '@assets/default-avatar.png'
import './index.scss'

@inject('user')
@inject('app')
@observer
export default class Profile extends Component {
  static defaultProps = {
    className: '',
    forShareMP: false,
    onPosterShown: () => {},
    onSaved: () => {},
    onError: () => {}
  } 

  state = {
    showPoster: false,
    qrSrc: '',
    goodsSrc: '',
    logoSrc: defaultAvatar,
    userHeadSrc: '',
    goodsWidth: 0,
    goodsHeight: 0,
    canvasScale: [1, 1]
  }

  constructor() {
    super(...arguments)
  }

  untilImgLoaded(cb) {
    let timeOut = null
    let totalTimes = 0
    const _clear = () => {
      clearTimeout(timeOut)
      timeOut = null
    }
    const loop = () => {
      if (totalTimes >= 60000) {
        _clear()
        this.props.onError()
        return
      }

      const { userHeadSrc, qrSrc } = this.state
      if (!userHeadSrc || !qrSrc) {
        timeOut = setTimeout(() => {
          loop()
        }, 100)
        totalTimes += 100
      } else {
        _clear()
        cb()
      }
    }

    loop()
  }

  mngPoster(e) {
    e && e.stopPropagation()
    this.setState({
      showPoster: true
    })

    this.initCanvasScale()
    this.sharePosteCanvas()
  }

  closeBox(e) {
    e && e.stopPropagation()
    this.setState({
      showPoster: false
    })
  }

  onGoodsLoad(e) {
    const { width, height } = e.detail
    this.setState({
      goodsWidth: width,
      goodsHeight: height
    }, () => {
      this.untilImgLoaded(
        this.drawCanvasForShareGoods.bind(this)
      )
    })
  }

  onGoodsError() {
    Taro.hideLoading()
    this.closeBox()
    Taro.showToast({
      title: '加载商品图片失败，请重试~',
      duration: 2000
    })
    this.props.onError()
  }

  // 分享商品时需要加载的图片
  getImagesForShareGoods() {
    return Promise.all([this.getGoodsSrc(), this.getUserHead(), this.getQrCode()])
  }

  // 分享小程序本身时需要加载的图片
  getImagesForShareMP() {
    return Promise.all([this.getUserHead(), this.getQrCode()])
  }

  getGoodsSrc() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await downLoadFile(
          'https://ai-call-platform.oss-cn-hangzhou.aliyuncs.com/CompanyWebsite/OfficialWebsite/NewsPicture/news2@2x_1548753493146.jpg'
        )
        this.setState({
          goodsSrc: data
        }, () => {
          resolve()
        })
      } catch (e) {
        Taro.showToast({
          title: '加载商品图片失败，请重试~',
          duration: 2000
        })
        this.props.onError()
        reject()
      }
    })
  }

  getUserHead() {
    const { user: { userInfo: { avatarUrl } } } = this.props
    return new Promise(async (resolve, reject) => {
      try {
        let data = defaultAvatar
        if (avatarUrl) {
          data = await downLoadFile(avatarUrl)
        }
        this.setState({
          userHeadSrc: data
        }, () => {
          resolve()
        })
      } catch (e) {
        Taro.showToast({
          title: '加载用户头像失败，请重试~',
          duration: 2000
        })
        this.props.onError()
        reject()
      }
    })
  }

  async getQrCode() {
    return new Promise(async (resolve, reject) => {
      if (this.state.qrSrc) {
        resolve()
        return
      }

      try {
        const data = await downLoadFile(
          'https://user-images.githubusercontent.com/5935390/43631321-765fdc46-9735-11e8-8312-798846c3f557.jpg'
        )
        this.setState({
          qrSrc: data
        }, () => {
          resolve()
        })
      } catch (e) {
        Taro.showToast({
          title: '加载小程序码失败，请重试~',
          duration: 2000
        })
        this.props.onError()
        reject()
      }
    })
  }

  textByteLength(text, num) { // text为传入的文本  num为单行显示的字节长度
    let strLength = 0 // text byte length
    let rows = 1
    let str = 0
    let arr = []
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2
        if (strLength > rows * num) {
          strLength++
          arr.push(text.slice(str, j))
          str = j
          rows++
        }
      } else {
        strLength++
        if (strLength > rows * num) {
          arr.push(text.slice(str, j))
          str = j
          rows++
        }
      }
    }
    arr.push(text.slice(str, text.length))
    return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
  }

  initCanvasScale() {
    const { app } = this.props
    const scaleY = (app.clientH - 110) / 510
    const scaleX = app.clientW / 375
    const scale = parseFloat(Math.min(scaleX, scaleY, 1).toFixed(2), 10)
    // todo 不允许放大，最大放大比例为1，但要按比例来
    // 有个问题，如果按比例放大，如果比例不等于初始值，会导致海报右边或下边有空白
    this.setState({
      canvasScale: [scale, scale]
    })
  }

  componentDidMount() {
    this.getQrCode()
    // this.getUserHead()
  }

  // 分享商品时的绘制方法
  drawCanvasForShareGoods() {
    const { qrSrc, goodsSrc, logoSrc, userHeadSrc, goodsWidth, goodsHeight, canvasScale } = this.state
    const { user: { userInfo: { login, nickName } } } = this.props

    const ctx = Taro.createCanvasContext('myCanvas', this.$scope)
    // const query = Taro.createSelectorQuery().in(this.$scope)

    // query.select('#canvasContainer').boundingClientRect(rect => {
      const height = 510 // rect.height
      const cWidth = 325 // rect.width
      const left = 20
      const width = cWidth - 2 * left
      const halfWidth = cWidth / 2
      const logoWidth = 30
      const logoTop = 5
      const logoLeft = halfWidth - 25

      ctx.save()
      ctx.scale(canvasScale[0], canvasScale[1])

      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, cWidth, height)

      // logo
      ctx.drawImage(logoSrc, logoLeft, logoTop, logoWidth, logoWidth)

      ctx.setFontSize(14)
      ctx.setFillStyle('#000')
      ctx.setTextAlign('left')
      ctx.fillText('蜜折', logoLeft + 35, 25) //

      // 商品图片
      const goodsTop = logoWidth + logoTop * 2
      if (goodsSrc) {
        let clipW, clipH
        clipW = clipH = Math.min(goodsHeight, goodsWidth, width)
        ctx.drawImage(goodsSrc, 0, 0, clipW, clipH, left, goodsTop, width, width)
      }

      const titleTop = goodsTop + width + 28
      ctx.setFontSize(16)
      ctx.setFillStyle('#000')
      ctx.setTextAlign('left')
      ctx.fillText('润本婴儿夏季户外驱蚊喷雾', left + 10, titleTop) //

      const priceTop = titleTop + 30
      ctx.setFontSize(14)
      ctx.setFillStyle('#FF4949')
      ctx.setTextAlign('left')
      ctx.fillText('¥33.90', left + 10, priceTop) //price

      if (login) {
        // 个人头像
        const headTop = titleTop + 15
        if (userHeadSrc) {
          ctx.save()
          ctx.beginPath()
          ctx.arc(halfWidth + 10, headTop + 10, 10, 0, 2*Math.PI)
          ctx.clip()
          ctx.drawImage(userHeadSrc, halfWidth, headTop, 20, 20)
          ctx.restore()
        }

        const userTop = titleTop + 28
        ctx.setFontSize(10)
        ctx.setFillStyle('#666')
        ctx.setTextAlign('left')
        ctx.fillText(`来自${nickName}的分享`, halfWidth + 25, userTop) //
      }

      ctx.setStrokeStyle('#d6e4ef')
      ctx.strokeRect(left, goodsTop, width, width + 30 + 5 + 40)

      // const CONTENT_ROW_LENGTH = 24 // 正文 单行显示字符长度
      // let [contentLeng, contentArray, contentRows] = this.textByteLength(/*cardInfo.CardInfo.Company*/'人生无限公司', CONTENT_ROW_LENGTH)
      // ctx.setTextAlign('left')
      // ctx.setFillStyle('#000')
      // ctx.setFontSize(10)
      // let contentHh = 22 * 1
      // for (let m = 0; m < contentArray.length; m++) {
      //   ctx.fillText(contentArray[m], left, width + 150 + contentHh * m)
      // }

      //  绘制二维码
      const qrTop = titleTop + 55
      console.log('qrSrc:' + qrSrc)
      if (qrSrc) {
        ctx.drawImage(qrSrc, left, qrTop, 80, 80)
        ctx.setFontSize(12)
        ctx.setFillStyle('#000')
        ctx.setTextAlign('left')
        ctx.fillText("长按图片识别二维码", left + 88, qrTop + 45)
        ctx.fillText("查看商品详情", left + 88, qrTop + 63)
      }

      ctx.restore()
      // setTimeout(() => {
        ctx.draw()  // 这里有个需要注意就是，这个方法是在绘制完成之后在调用，不然容易其它被覆盖。
        Taro.hideLoading()
        this.props.onPosterShown()
      // }, 2000)
    // }).exec()
  }

  // 分享小程序本身时的绘制方法
  drawCanvasForShareMP() {
    const { qrSrc, userHeadSrc, canvasScale } = this.state

    const ctx = Taro.createCanvasContext('myCanvas', this.$scope)

    // const height = 490 // rect.height
    const cWidth = 325 // rect.width
    const left = 20
    const halfWidth = cWidth / 2
    const logoWidth = 30
    const logoTop = 5
    // const logoLeft = halfWidth - 25

    ctx.save()
    ctx.scale(canvasScale[0], canvasScale[1])

    // // logo
    // ctx.drawImage(logoSrc, logoLeft, logoTop, logoWidth, logoWidth)

    // ctx.setFontSize(14)
    // ctx.setFillStyle('#000')
    // ctx.setTextAlign('left')
    // ctx.fillText('蜜折', logoLeft + 35, 25) //

    //  绘制二维码
    const qrTop = logoWidth + logoTop * 2
    if (qrSrc) {
      ctx.drawImage(qrSrc, 0, qrTop, cWidth, cWidth)
      ctx.setFontSize(12)
      ctx.setFillStyle('#000')
      ctx.setTextAlign('left')
      ctx.fillText("长按图片识别二维码", left, qrTop + cWidth + 45)
      ctx.fillText("查看蜜折小程序~", left, qrTop + cWidth + 63)
    }

    // 个人头像
    const headTop = qrTop + cWidth + 28 + 7
    if (userHeadSrc) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(halfWidth + 10, headTop + 10, 10, 0, 2*Math.PI)
      ctx.clip()
      ctx.drawImage(userHeadSrc, halfWidth, headTop, 20, 20)
      ctx.restore()
    }

    const userTop = headTop + 9
    ctx.setFontSize(10)
    ctx.setFillStyle('#666')
    ctx.setTextAlign('left')
    ctx.fillText('来自周杰的分享', halfWidth + 25, userTop) //

    ctx.restore()
    ctx.draw()
    Taro.hideLoading()
    this.props.onPosterShown()
  }

  async sharePosteCanvas() {
    Taro.showLoading({
      title: '生成中...',
      mask: true,
    })

    if (this.props.forShareMP) {
      await this.getImagesForShareMP()
      this.drawCanvasForShareMP()
    } else {
      await this.getImagesForShareGoods()
    }
  }

  //点击保存到相册
  saveShareImg() {
    const that = this
    Taro.showLoading({
      title: '正在保存',
      mask: true
    })
    setTimeout(() => {
      Taro.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success(res) {
          Taro.hideLoading()
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              Taro.showToast({
                title: '保存成功~',
                icon: '',
                duration: 2000
              })
              that.props.onSaved()
            },
            fail: function({ errMsg }) {
              Taro.showToast({
                title: errMsg,
                duration: 2000
              })
            }
          })
        },
        fail: function(err) {
          console.log(err)
          Taro.hideLoading()
          Taro.showToast({
            title: '保存失败，请重试~',
            icon: '',
            duration: 2000
          })
        }
      }, this.$scope)
    }, 1000)
  }

  render () {
    const { showPoster, goodsSrc, canvasScale } = this.state
    const { className, forShareMP } = this.props

    return (
      <View className={'qrcode ' + className}>

        {showPoster && 
          <View class='qrcode-imgBox'>
            <View className='qrcode-imgBox-img-con' style={`transform: scale(${canvasScale[0]},${canvasScale[1]})`}>
              <Canvas
                className='qrcode-imgBox-img'
                canvasId='myCanvas'
                style={`height: ${forShareMP ? 490 : 510}px;width: 325px;`}
                id='canvasContainer'
              />
            </View>
          </View>
        }

        {goodsSrc &&
          <Image
            onLoad={this.onGoodsLoad.bind(this)}
            onError={this.onGoodsError.bind(this)}
            className='get-img-info'
            src={goodsSrc}
          />
        }
      </View>
    )
  }
}
