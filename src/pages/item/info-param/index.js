import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class InfoParam extends Component {
  static defaultProps = {
    list: []
  }

  render () {
    let { list } = this.props
    list = list.slice(0, 2)
    return (
      <View className='item-info-param'>
        <View className='item-info-param__title'>
          <Text className='item-info-param__title-txt'>商品参数</Text>
        </View>
        {list.map((item, index) => (
          <View key={index} className='item-info-param__item'>
            <Text className='item-info-param__item-name'>{item.attrName}</Text>
            <Text className='item-info-param__item-value'>{item.attrValue}</Text>
          </View>
        ))}
      </View>
    )
  }
}
