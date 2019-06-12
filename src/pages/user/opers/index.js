import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import jump from '@utils/jump'
import { AtList, AtListItem, AtIcon } from "taro-ui"
import './index.scss'

import payingPng from '../static/img/paying.png'
import shipedPng from '../static/img/shiped.png'
import shippingPng from '../static/img/shipping.png'

export default class Menu extends Component {
  handleClick = (menu) => {
    // NOTE 时间关系，此处只实现帮助中心，用于演示多端 webview
    if (menu.key === 'help') {
      jump({ url: menu.url, title: menu.text })
    } else {
      Taro.showToast({
        title: '目前只实现了帮助中心~',
        icon: 'none'
      })
    }
  }

  gotoOrders() {
    Taro.showToast({
      title: '订单页尚未实现~',
      icon: 'none'
    })
  }

  withdrawal() {
    Taro.showToast({
      title: '提现成功~',
      icon: 'none'
    })
  }

  setAddr() {
    Taro.showToast({
      title: '设置地址页尚未实现~',
      icon: 'none'
    })
  }

  partners() {
    Taro.showToast({
      title: '合伙人页尚未实现~',
      icon: 'none'
    })
  }

  authorization() {
    Taro.showToast({
      title: '授权页尚未实现~',
      icon: 'none'
    })
  }

  render () {
    return (
      <View className='user-menu'>
        <AtList className='user-menu-orders' hasBorder={false}>
          <AtListItem title='我的订单' arrow='right' onClick={this.gotoOrders} />
        </AtList>

        <View className='at-row user-menu-block'>
          <View className='at-col flex-column'>
            <Image className='paying__img img-icon' src={payingPng} />
            <Text className='item-info-param__title-txt ml10'>待付款</Text>
          </View>
          <View className='at-col flex-column'>
            <Image className='shipping__img img-icon' src={shippingPng} />
            <Text className='item-info-param__title-txt ml10'>待发货</Text>
          </View>
          <View className='at-col flex-column'>
            <Image className='shiped__img img-icon' src={shipedPng} />
            <Text className='item-info-param__title-txt ml10'>已发货</Text>
          </View>
        </View>

        <View className='bonus user-menu-block'>
          <View className='bonus-title'>
            <Text className='bonus-title-txt ml10'>可体现奖励金</Text>
          </View>
          <View className='bonus-money'>
            ¥<Text className='bonus-money-txt ml10'>507.00</Text>
            <Button type='warn' className='bonus-money-btn' onClick={this.withdrawal}>提现</Button>
          </View>
          <View className='bonus-detail'>
            <AtIcon value='money' size='30' color='#F00'></AtIcon>
            <Button type='warn' className='bonus-money-btn' onClick={this.withdrawal}>查看收入明细</Button>
            <AtIcon value='chevron-right' size='30' color='#F00'></AtIcon>
          </View>
        </View>

        <AtList hasBorder={false} className='user-menu-block'>
          <AtListItem
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            title='收获地址'
            onClick={this.setAddr}
          />
          <AtListItem
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            title='我的合伙人'
            onClick={this.partners}
          />
        </AtList>
        <AtList hasBorder={false} className='user-menu-block'>
          <AtListItem title='重新授权' arrow='right' onClick={this.authorization} />
        </AtList>
      </View>
    )
  }
}
