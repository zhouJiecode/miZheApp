import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import { CheckboxItem } from '@components'
import './index.scss'

export default class List extends Taro.PureComponent {
  static defaultProps = {
    list: [],
    onUpdate: () => {},
    onUpdateCheck: () => {}
  }

  getBaseItem = (item) => ({
    skuId: item.skuId,
    type: item.type,
    extId: item.extId,
    cnt: item.cnt,
    checked: item.checked,
    canCheck: true,
    promId: this.props.promId,
    promType: this.props.promType
  })

  handleUpdate = (item, cnt) => {
    this.props.onUpdate({
      id: item.id,
      cnt: cnt
    })
  }

  handleUpdateCheck = (item) => {
    this.props.onUpdateCheck({
      checkedList: item.checked ? [] : item.id,
      notCheckedList: item.checked ? item.id : []
    })
  }

  render () {
    const { list } = this.props
    return (
      <View className='cart-list'>
        {list.map(item => (
          <View
            key={item.id}
            className='cart-list__item'
          >
            <CheckboxItem
              checked={item.checked}
              onClick={this.handleUpdateCheck.bind(this, item)}
            />
            <Image
              className='cart-list__item-img'
              src={item.pic}
            />
            <View className='cart-list__item-info'>
              <View className='cart-list__item-title'>
                {!!item.prefix &&
                  <Text className='cart-list__item-title-tag'>{item.prefix}</Text>
                }
                <Text className='cart-list__item-title-name' numberOfLines={1}>
                  {item.itemName}
                </Text>
              </View>

              <View className='cart-list__item-spec'>
                <Text className='cart-list__item-spec-txt'>
                  {item.specList.join(' ')}
                </Text>
              </View>

              <View className='cart-list__item-wrap'>
                <Text className='cart-list__item-price'>
                  ¥{item.actualPrice}
                </Text>
                <View className='cart-list__item-num'>
                  <AtInputNumber
                    customStyle={{'border-radius': '4px', height: '30px'}}
                    className='custome-input-number'
                    min={0}
                    max={10}
                    step={1}
                    value={item.cnt}
                    onChange={this.handleUpdate.bind(this, item)}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
