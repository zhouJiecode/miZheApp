import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Loading, TapBar, Empty } from '@components'
import { WithLogin } from '@HOC'
import { observer, inject } from '@tarojs/mobx'
import List from './list'
import Footer from './footer'
import './cart.scss'

@inject('cart')
@inject('app')
@inject('user')
@observer
class Index extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    loaded: false
  }

  componentDidShow() {
    this.loadCart()
  }

  async loadCart() {
    this.setState({ loaded: false })
    await this.props.cart.dispatchCart()
    this.setState({ loaded: true })
  }

  onGetUserInfo({ currentTarget: { userInfo } }) {
    this.props.user.setUserInfo(userInfo)
  }

  dispatchUpdate(params) {
    this.props.cart.dispatchUpdate(params)
  }

  dispatchUpdateCheck(params) {
    this.props.cart.dispatchUpdateCheck(params)
  }

  render () {
    const { cart: { cartList, selectedCount }, app: { enableHideBar } } = this.props
    const isEmpty = !cartList.length

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <WithLogin>
        <View className={'cart page-con ' + (enableHideBar ? '' : 'no-tab-bar')}>
          <ScrollView
            scrollY
            className='cart__wrap'
          >
            {isEmpty && <Empty />}

            {!isEmpty &&
              <List
                list={cartList}
                onUpdate={this.dispatchUpdate.bind(this)}
                onUpdateCheck={this.dispatchUpdateCheck.bind(this)}
              />
            }

            {!isEmpty &&
              <View className='cart__footer--placeholder' />
            }
          </ScrollView>

          {!isEmpty &&
            <View className='cart__footer'>
              <Footer
                cartList={cartList}
                selectedCount={selectedCount}
                onUpdateCheck={this.dispatchUpdateCheck.bind(this)}
              />
            </View>
          }
          <TapBar></TapBar>
        </View>
      </WithLogin>
    )
  }
}

export default Index
