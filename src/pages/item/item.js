import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Loading } from '@components'
import { observer, inject } from '@tarojs/mobx'
import Gallery from './gallery'
import InfoBase from './info-base'
import InfoParam from './info-param'
import PlaceOrder from './place-order'
import './item.scss'

@inject('item')
@inject('cart')
@observer
class Item extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '商品详情'
  }

  onShareAppMessage(res) {
    // todo: 根据当前所选项信息返回数据对象，其他页面分享的是整个小程序，这里分享的是具体商品
    return {
      title: '我的小程序嘻嘻个嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻。。。。。。。。。。。。。',
      path: res.webViewUrl,
      imageUrl: 'https://yanxuan.nosdn.127.net/b55964645fb27f77624a02043a14315b.png'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {}
    }

    this.itemId = parseInt(this.$router.params.itemId)
  }

  componentDidMount() {
    const { item } = this.props

    item.dispatchItem({ itemId: this.itemId }).then(() => {
      this.setState({ loaded: true })
    })
  }

  handleSelect = (selected) => {
    this.setState({ selected })
  }

  handleAdd = () => {
    const { cart } = this.props
    const { selected } = this.state
    const isSelected = !!selected.id

    if (isSelected) {
      const selectedItem = isSelected ? selected : {
        id: selected.id,
        cnt: 1
      }

      const params = {
        id: selected.id,
        cnt: selectedItem.cnt
      }
      cart.dispatchAdd(params).then(() => {
        Taro.showToast({
          title: '加入购物车成功',
          icon: 'none'
        })
      })
    }
  }

  render () {
    const { item: { itemInfo } } = this.props
    const { itemDetail = {} } = itemInfo
    const persons = [{
      src: ''
    }]
    const gallery = [
      itemInfo.listPicUrl,
      itemDetail.picUrl1, itemDetail.picUrl2, itemDetail.picUrl3, itemDetail.picUrl4
    ].filter(i => i)

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <View className='item'>
        <ScrollView
          scrollY
          className='item__wrap'
        >
          <Gallery list={gallery} />
          <InfoBase data={itemInfo} />
          <InfoParam list={itemInfo.attrList} />
          <PlaceOrder list={persons}></PlaceOrder>
          {/* <Detail html={itemDetail.detailHtml} /> */}
        </ScrollView>

        {/* <View className='item__footer'>
          <Footer onAdd={this.handleAdd} />
        </View> */}
      </View>
    )
  }
}

export default Item
