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
          <Text className='item-info-param__title-txt'>剩余</Text>
          <Text className='item-info-param__title-txt'>48</Text>
          <Text className='item-info-param__title-txt'>:</Text>
          <Text className='item-info-param__title-txt'>23</Text>
          <Text className='item-info-param__title-txt'>:</Text>
          <Text className='item-info-param__title-txt'>09</Text>
        </View>
        <van-button type="danger">下单</van-button>
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
