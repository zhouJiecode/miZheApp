import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { CheckboxItem, ButtonItem } from '@components'
import './index.scss'

export default class Footer extends Taro.PureComponent {
  static defaultProps = {
    selectedCount: 0,
    cartList: [],
    onUpdateCheck: () => {}
  }

  handleUpdateCheck = () => {
    const { cartList, selectedCount, onUpdateCheck } = this.props
    const selectAll = selectedCount === cartList.length && selectedCount
    const allIds = this.cartList.map(item => item.id)

    const params = {
      checkedList: selectAll ? [] : allIds,
      notCheckedList: selectAll ? allIds : []
    }

    onUpdateCheck(params)
  }

  handleOrder = () => {
    Taro.showToast({
      title: '敬请期待',
      icon: 'none'
    })
  }

  render () {
    const { cartList, selectedCount } = this.props
    const selectAll = selectedCount === cartList.length && selectedCount
    const actualPrice = cartList.reduce((pre, cur) => pre + cur.actualPrice, 0)

    return (
      <View className='cart-footer'>
        <View className='cart-footer__select'>
          <CheckboxItem
            checked={selectAll}
            onClick={this.handleUpdateCheck}
          >
            <Text className='cart-footer__select-txt'>
              {selectAll ? '全选' : `已选(${selectedCount})`}
            </Text>
          </CheckboxItem>
        </View>
        <View className='cart-footer__amount'>
          <Text className='cart-footer__amount-txt'>
            ¥{parseFloat(actualPrice).toFixed(2)}
          </Text>
        </View>
        <View className='cart-footer__btn'>
          <ButtonItem
            type='primary'
            text='下单'
            onClick={this.handleOrder}
          />
        </View>
      </View>
    )
  }
}
