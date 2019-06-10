import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Recommend extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (id) => {
    Taro.navigateTo({
      url: `/pages/item/item?itemId=${id}`
    })
  }

  render () {
    const { list } = this.props
    return (
      <View className='home-recommend'>
        <View className='home-recommend__list'>
          {list.filter(item => item.type === 1).map((item) => {
            const { id, categoryItem } = item
            return (
              <View
                key={id}
                className='home-recommend__list-item'
                onClick={this.handleClick.bind(this, id)}
              >
                {/* 商品图片 */}
                <Image className='home-recommend__list-item-img' src={categoryItem.listPicUrl} />

                {/* 商品主描述 */}
                {<Text className='home-recommend__list-item-desc' numberOfLines={1}>
                    {categoryItem.simpleDesc}
                  </Text>
                }

                <View className='home-recommend__list-item-info'>
                  {/* 商品次描述 */}
                  <Text className='home-recommend__list-item-name' numberOfLines={1}>
                    {categoryItem.name}
                  </Text>

                  {/* 商品价格 */}
                  <View className='home-recommend__list-item-price-wrap'>
                    <Text className='home-recommend__list-item-price'>
                      ¥{categoryItem.activityPrice || categoryItem.retailPrice}
                    </Text>
                    {!!categoryItem.activityPrice &&
                      <Text className='home-recommend__list-item-price--origin'>
                        ¥{categoryItem.retailPrice}
                      </Text>
                    }
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
