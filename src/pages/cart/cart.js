import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Loading, TapBar } from '@components'
import { observer, inject } from '@tarojs/mobx'
import Empty from './empty'
import List from './list'
import Footer from './footer'
import './cart.scss'

@inject('home')
@inject('cart')
@inject('app')
@observer
class Index extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    loaded: false
  }

  componentWillMount () {
    // Taro.hideTabBar()
  }

  componentDidShow() {
    const { home, cart } = this.props
    // fetch({ url: API_CHECK_LOGIN, showToast: false, autoLogin: false }).then((res) => {
    //   if (res) {
        this.setState({ loaded: true })
        cart.dispatchCart()
        cart.dispatchCartNum()
        home.dispatchRecommend()
      // } else {
      //   this.setState({ loaded: true, login: false })
      // }
    // })
  }

  toLogin = () => {
    Taro.navigateTo({
      url: '/pages/user-login/user-login'
    })
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
    }]// cartGroupList.filter(i => !i.promType)
    // const extList = recommend.extList || []
    const isEmpty = !cartList.length
    const isShowFooter = !isEmpty

    if (!this.state.loaded) {
      return <Loading />
    }

    // if (!this.state.login) {
    //   return (
    //     <View className='cart cart--not-login'>
    //       <Empty text='未登陆' />
    //       <View className='cart__login'>
    //         <ButtonItem
    //           type='primary'
    //           text='登录'
    //           onClick={this.toLogin}
    //           compStyle={{
    //             background: '#b59f7b',
    //             borderRadius: Taro.pxTransform(4)
    //           }}
    //         />
    //       </View>
    //     </View>
    //   )
    // }

    return (
      <View className={'cart page-con ' + (enableHideBar ? '' : 'no-tab-bar')}>
        <ScrollView
          scrollY
          className='cart__wrap'
        >
          {/* <Tip list={cartInfo.policyDescList} /> */}
          {isEmpty && <Empty />}

          {/* {!isEmpty && <Gift data={cartGroupList[0]} />} */}

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

          {/* 相关推荐 */}
          {/* {extList.map((ext, index) => (
            <ItemList key={index} list={ext.itemList}>
              <View className='cart__ext'>
                {!!ext.picUrl && <Image className='cart__ext-img' src={ext.picUrl} />}
                <Text className='cart__ext-txt'>{ext.desc}</Text>
              </View>
            </ItemList>
          ))} */}

          {/* 猜你喜欢 */}
          {/* <ItemList list={recommend.itemList}>
            <View className='cart__recommend'>
              <Text className='cart__recommend-txt'>{recommend.desc}</Text>
            </View>
          </ItemList> */}

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
    )
  }
}

export default Index
