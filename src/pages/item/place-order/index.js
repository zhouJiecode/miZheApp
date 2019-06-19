import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { timeReduceOneSecond } from '@utils'
import './index.scss'

export default class InfoParam extends Taro.PureComponent {
  static defaultProps = {
    list: []
  }

  state = {
    interval: null,
    hour: '48',
    minute: '23',
    second: '09'
  }

  componentDidMount() {
    const interval = window.setInterval(() => {
      const { hour, minute, second } = this.state
      const rs = timeReduceOneSecond(hour, minute, second)
      this.setState({
        hour: rs.hour,
        minute: rs.minute,
        second: rs.second
      })
    }, 1000)
    this.setState({ interval })
  }

  componentWillUnmount () {
    const { interval } = this.state
    if (interval) {
      window.clearInterval(interval)
      this.setState({ interval: null })
    }
  }

  placeOrder() {
    Taro.showToast({
      title: '下单成功，请去购物车结算~',
      icon: 'none'
    })
  }

  render () {
    const { hour, minute, second } = this.state
    let { list } = this.props
    list = list.slice(0, 2)

    return (
      <View className='item-info-param'>
        <View className='item-info-param__title'>
          <View className='inline-block mr9'>
            <Text className='item-info-param__title-txt'>剩余</Text>
          </View>
          <Text className='item-info-param__title-txt time'>{hour}</Text>
          <Text className='item-info-param__title-txt'>:</Text>
          <Text className='item-info-param__title-txt time'>{minute}</Text>
          <Text className='item-info-param__title-txt'>:</Text>
          <Text className='item-info-param__title-txt time'>{second}</Text>
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
                    src={
                      item.src ||
                      'https://ai-call-platform.oss-cn-hangzhou.aliyuncs.com/CompanyWebsite/OfficialWebsite/NewsPicture/news2@2x_1548753493146.jpg'
                    }
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
