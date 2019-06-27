import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

@inject('orders')
@observer
export default class List extends Taro.PureComponent {
  static defaultProps = {
    order: {}
  }

  async delOrder() {
    const { orders, order } = this.props
    await orders.delOrder(order.id)
    Taro.showToast({
      title: '删除成功',
      icon: 'none'
    })
  }

  buyAgain() {
    
  }

  render () {
    const { order } = this.props
    return (
      <View className='order-list__item'>

        <View className='order-list__item-header'>
          <Text className='order-list__item-header-orderId'>订单编号：{order.id}</Text>
          <Button className='order-list__item-header-del' onClick={this.delOrder.bind(this)}>
            <AtIcon className='mt-3' value='trash' size='12' color='#333'></AtIcon>
          </Button>
        </View>

        <View className='order-list__item-body'>
          <View className='order-list__item-body-img-con'>
            <Image
              className='order-list__item-body-img'
              src={order.src}
            />
          </View>
          <Text className='order-list__item-body-msg'>{order.msg}</Text>
          <Text className='order-list__item-body-price'>¥{order.price}</Text>
        </View>

        <View className='order-list__item-footer'>
          <Button className='order-list__item-footer-del' onClick={this.buyAgain.bind(this)}>
            再次购买
          </Button>
        </View>
      </View>
    )
  }
}
