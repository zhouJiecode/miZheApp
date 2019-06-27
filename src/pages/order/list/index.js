import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Loading, Empty } from '@components'
import { observer, inject } from '@tarojs/mobx'
import Item from './item'
import './index.scss'

@inject('orders')
@observer
class Index extends Taro.PureComponent {
  static defaultProps = {
    orderList: [],
    loaded: false
  }

  render () {
    const { orderList, loaded } = this.props
    const isEmpty = !orderList.length

    if (!loaded) {
      return <Loading />
    }

    return (
      <View className='cart page-con'>
        <ScrollView
          scrollY
          className='cart__wrap'
        >
          {isEmpty && <Empty />}

          {!isEmpty && 
            <View className='order-list'>
              {
                orderList.map((order, index) => (
                  <Item
                    key={index}
                    order={order}
                    onUpdate={this.props.dispatchUpdate}
                    onUpdateCheck={this.props.dispatchUpdateCheck}
                  />
                ))
              }
            </View>
          }

          {/* 相关推荐 */}
          {/* {extList.map((ext, index) => (
            <ItemList key={index} list={ext.itemList}>
              <View className='cart__ext'>
                {!!ext.picUrl && <Image className='cart__ext-img' src={ext.picUrl} />}
                <Text className='cart__ext-txt'>{ext.desc}</Text>
              </View>
            </ItemList>
          ))} */}

          {/* 猜你喜欢 */}
          {/* <ItemList list={recommend.itemList}>
            <View className='cart__recommend'>
              <Text className='cart__recommend-txt'>{recommend.desc}</Text>
            </View>
          </ItemList> */}
        </ScrollView>
      </View>
    )
  }
}

export default Index
