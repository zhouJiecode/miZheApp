import Taro from '@tarojs/taro'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtInput } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import { AtModal } from '@components'
import './index.scss'

import payingPng from '../static/img/paying.png'
import shipedPng from '../static/img/shiped.png'
import shippingPng from '../static/img/shipping.png'

@inject('user')
@observer
export default class Menu extends Taro.PureComponent {
  state = {
    money: undefined,
    openModal: false
  }

  handleMoneyChange(e) {
    this.setState({ money: e.detail.value || undefined })
  }

  gotoOrders() {
    Taro.showToast({
      title: '订单页尚未实现~',
      icon: 'none'
    })
  }

  withdrawal() {
    this.setState({ openModal: true })
    
  }

  handleCancel() {
    // 取消提现
    this.setState({ openModal: false })
  }

  handleConfirm() {
    // 确认提现
    this.setState({ openModal: false })
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

  onGetUserInfo({ currentTarget: { userInfo } }) {
    const { user } = this.props
    console.log(arguments)
    user.setUserInfo({ userInfo })
  }

  render () {
    return (
      <View className='user-menu'>
        <AtList className='user-menu-orders mt10' hasBorder={false}>
          <AtListItem title='我的订单' arrow='right' onClick={this.gotoOrders} hasBorder={false} />
        </AtList>

        <View className='at-row user-menu-block mt10'>
          <View className='at-col flex-column'>
            <Image className='paying__img img-icon' src={payingPng} />
            <Text className='at-row-txt'>待付款</Text>
          </View>
          <View className='at-col flex-column'>
            <Image className='shipping__img img-icon' src={shippingPng} />
            <Text className='at-row-txt'>待发货</Text>
          </View>
          <View className='at-col flex-column'>
            <Image className='shiped__img img-icon' src={shipedPng} />
            <Text className='at-row-txt'>已发货</Text>
          </View>
        </View>

        <View className='bonus user-menu-block mt10'>
          <View className='bonus-title'>
            <Text className='bonus-title-txt'>可提现奖励金</Text>
          </View>
          <View className='bonus-money'>
            ¥<Text className='bonus-money-txt'>507.00</Text>
            <Button type='warn' className='bonus-money-btn' onClick={this.withdrawal}>提现</Button>
          </View>
          <View className='bonus-detail'>
            <AtIcon className='mt-2' value='money' size='12' color='#F00'></AtIcon>
            <Text className='bonus-detail-btn' onClick={this.withdrawal}>查看收入明细</Text>
            <AtIcon className='mt-2' value='chevron-right' size='12' color='#F00'></AtIcon>
          </View>
        </View>

        <AtList hasBorder={false} className='user-menu-block mt10'>
          <AtListItem
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            title='收货地址'
            onClick={this.setAddr}
          />
          <AtListItem
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            title='我的合伙人'
            onClick={this.partners}
            hasBorder={false}
          />
        </AtList>
        <View className='user-menu-block mt15 user-menu-auth'>
          <Button open-type='getUserInfo' className='user-menu-auth-btn' onGetUserInfo={this.onGetUserInfo}>
            <Text className='user-menu-auth-btn-txt'>重新授权</Text>
            <AtIcon className='font48 float-r place-holder' value='chevron-right' size='12' color='#F00'></AtIcon>
          </Button>
        </View>

        <AtModal
          title='提现'
          isOpened={this.state.openModal}
          cancelText='取消'
          confirmText='确认提现'
          onCancel={this.handleCancel.bind(this)}
          onConfirm={this.handleConfirm.bind(this)}
        >
          <Input
            className='user-menu-money-input'
            name='value'
            title='金额：'
            type='number'
            placeholder='请输入提现金额'
            value={this.state.money}
            onChange={this.handleMoneyChange.bind(this)}
          />
        </AtModal>
      </View>
    )
  }
}
