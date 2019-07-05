import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { ActionSheet } from '@components'
import './index.scss'

export default class InfoBase extends Taro.PureComponent {
  static defaultProps = {
    data: {}
  }

  state = {
    actionSheetVisible: false
  }

  handleActionSheetClose() {
    this.setState({
      actionSheetVisible: false
    })
  }

  openActionSheet() {
    this.setState({
      actionSheetVisible: true
    })
  }

  render () {
    const { data } = this.props
    const { itemStar = {} } = data
    const { actionSheetVisible } = this.state

    return (
      <View className='item-info-base'>

        <View className='item-info-base__price'>
          <View className='item-info-base__price-wrap'>
            <Text className='item-info-base__price-symbol'>¥</Text>
            <Text className='item-info-base__price-txt'>
              {data.activityPrice || data.retailPrice}
            </Text>
            {!!data.activityPrice &&
              <Text className='item-info-base__price-origin'>
                ¥{data.retailPrice}
              </Text>
            }
          </View>
          <View className='item-info-base__share' onClick={this.openActionSheet.bind(this)}>
            <AtIcon customStyle='' value='share-2' size='20' color='#666'></AtIcon>
            <Text className='item-info-base__share-txt' style='font-size: 8px;'>分享</Text>
          </View>
        </View>

        <View className='item-info-base__header'>
          <View className='item-info-base__header-wrap'>
            <Text className='item-info-base__header-name'>{data.name}</Text>
            <Text className='item-info-base__header-desc'>{data.simpleDesc}</Text>
          </View>
          <View className='item-info-base__header-star'>
            <Text className='item-info-base__header-star-txt'>
              {`${parseFloat(itemStar.goodCmtRate) || 0}%`}
            </Text>
            <Text className='item-info-base__header-star-link'>{'好评率>'}</Text>
          </View>
        </View>

        <ActionSheet
          visible={actionSheetVisible}
          onClose={this.handleActionSheetClose.bind(this)}
        />

        {/* {!!tagList.length &&
          <View className='item-info-base__tag'>
            {tagList.map(item => (
              <View key={item.id} className='item-info-base__tag-item'>
                <Text className='item-info-base__tag-item-txt'>{item.tagName}</Text>
                <Image className='item-info-base__tag-item-img' src={rightArrow} />
              </View>
            ))}
          </View>
        } */}
      </View>
    )
  }
}
