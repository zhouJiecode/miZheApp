import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
// import { AtButton, AtToast } from 'taro-ui'
import './index.scss'

export default class InfoParam extends Taro.PureComponent {
  static defaultProps = {
    list: []
  }

  state = {}

  placeOrder() {
    Taro.showToast({
      title: '下单成功，请去购物车结算~',
      icon: 'none'
    })
  }

  render () {
    let { list } = this.props
    list = list.slice(0, 2)
    return (
      <View className='item-info-param'>
        <View className='item-info-param__title'>
          <View className='inline-block mr9'>
            <Text className='item-info-param__title-txt'>剩余</Text>
          </View>
          <Text className='item-info-param__title-txt time'>48</Text>
          <Text className='item-info-param__title-txt'>:</Text>
          <Text className='item-info-param__title-txt time'>23</Text>
          <Text className='item-info-param__title-txt'>:</Text>
          <Text className='item-info-param__title-txt time'>09</Text>
          <Text className='item-info-param__title-txt ml10'>结束</Text>
          <Button type='warn' className='item-info-param_order' onClick={this.placeOrder}>下单</Button>
        </View>

        <View className='item-info-param__order'>
          <View className='item-info-param__order-title'>
            <Text className='item-info-param__title-txt'>已有</Text>
            <Text className='item-info-param__title-txt warn'>38</Text>
            <Text className='item-info-param__title-txt'>人下单</Text>
          </View>
          <View className='item-info-param__order-persons'>
            {
              list.map((item, index) => {
                return (
                  <Image
                    className='item-info-param__order-persons-img'
                    key={index}
                    src='https://ai-call-platform.oss-cn-hangzhou.aliyuncs.com/CompanyWebsite/OfficialWebsite/NewsPicture/news2@2x_1548753493146.jpg'
                  ></Image>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
