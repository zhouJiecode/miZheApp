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
    const { cart } = this.props

    this.setState({ loaded: true })
    cart.dispatchCart()
  }

  onGetUserInfo({ currentTarget: { userInfo } }) {
    this.props.user.setUserInfo({ ...userInfo })
  }

  render () {
    const { cart: { cartInfo }, app: { enableHideBar } } = this.props
    const cartList = [{
      cartItemList: [{
        pic: 'https://ai-call-platform.oss-cn-hangzhou.aliyuncs.com/CompanyWebsite/OfficialWebsite/NewsPicture/news2@2x_1548753493146.jpg',
        prefix: '呵呵',
        itemName: 'xx沐浴露',
        actualPrice: '15',
        cnt: 1,
        specList: [],
        checked: true
      }]
    }]

    const isEmpty = !cartList.length
    const isShowFooter = !isEmpty

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

            {!isEmpty && cartList.map((group, index) => (
              <List
                key={index}
                promId={group.promId}
                promType={group.promType}
                list={group.cartItemList}
                onUpdate={this.props.dispatchUpdate}
                onUpdateCheck={this.props.dispatchUpdateCheck}
              />
            ))}

            {isShowFooter &&
              <View className='cart__footer--placeholder' />
            }
          </ScrollView>

          {isShowFooter &&
            <View className='cart__footer'>
              <Footer
                cartInfo={cartInfo}
                onUpdateCheck={this.props.dispatchUpdateCheck}
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
