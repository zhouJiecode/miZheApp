import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Loading } from '@components'
import { observer, inject } from '@tarojs/mobx'
import { getWindowHeight } from '@utils/style'
import Banner from './banner'
import Recommend from './recommend'
import searchIcon from './assets/search.png'

import './index.scss'

const RECOMMEND_SIZE = 20


@inject('home')
@inject('cart')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true
  }

  async componentDidMount() {
    // NOTE 暂时去掉不适配的内容
    Taro.showToast({
      title: '注意，由于严选小程序首页界面、接口大幅变动，暂时去掉不相符的部分，后续再跟进改动',
      icon: 'none',
      duration: 6000
    })

    const { home, cart } = this.props

    await home.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
    cart.dispatchCartNum()
    home.dispatchSearchCount()
    home.dispatchPin({ orderType: 4, size: 12 })
    this.loadRecommend()
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // increment = () => {
  //   const { counterStore } = this.props
  //   counterStore.increment()
  // }

  // decrement = () => {
  //   const { counterStore } = this.props
  //   counterStore.decrement()
  // }

  // incrementAsync = async () => {
  //   const { counterStore } = this.props
  //   await counterStore.incrementAsync()
  //   console.log('---------------')
  // }

  loadRecommend = () => {
    const { home } = this.props
    if (!this.state.hasMore || this.state.loading) {
      return
    }

    const payload = {
      lastItemId: this.state.lastItemId,
      size: RECOMMEND_SIZE
    }
    this.setState({ loading: true })
    home.dispatchRecommend(payload).then((res) => {
      const lastItem = res.rcmdItemList[res.rcmdItemList.length - 1]
      this.setState({
        loading: false,
        hasMore: res.hasMore,
        lastItemId: lastItem && lastItem.id
      })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: '目前只可点击底部推荐商品',
      icon: 'none'
    })
  }

  // render () {
  //   const { counterStore: { counter } } = this.props
  //   return (
  //     <View className='index'>
  //       <Button onClick={this.increment}>+</Button>
  //       <Button onClick={this.decrement}>-</Button>
  //       <Button onClick={this.incrementAsync}>Add Async</Button>
  //       <Text>{counter}</Text>
  //     </View>
  //   )
  // }
  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { home: { homeInfo, searchCount, recommend, pin } } = this.props
    return (
      <View className='home'>
        <View className='home__search'>
          <View className='home__search-wrap' onClick={this.handlePrevent}>
            <Image className='home__search-img' src={searchIcon} />
            <Text className='home__search-txt'>
              {`搜索商品，共${searchCount}款好物`}
            </Text>
          </View>
        </View>
        <ScrollView
          scrollY
          className='home__wrap'
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
        >
          <View onClick={this.handlePrevent}>
            <Banner list={homeInfo.focus} />
            {/* <Policy list={homeInfo.policyDesc} /> */}

            {/* 免费拼团 */}
            {/* <Pin
              banner={homeInfo.newUserExclusive}
              list={pin}
            /> */}

            {/* 不知道叫啥 */}
            {/* <Operation
              list={homeInfo.operationCfg}
              sale={homeInfo.saleCenter}
            /> */}

            {/* 品牌制造 */}
            {/* <Manufactory
              data={homeInfo.manufactory}
              boss={homeInfo.dingBossRcmd}
            /> */}

            {/* 限时购 */}
            {/* <FlashSale data={homeInfo.flashSale} /> */}

            {/* 人气推荐 */}
            {/* <Popular data={homeInfo.popularItems} /> */}

            {/* 类目热销榜 */}
            {/* <Category data={homeInfo.hotCategory} /> */}
          </View>

          {/* 为你推荐 */}
          <Recommend list={recommend} />

          {this.state.loading &&
            <View className='home__loading'>
              <Text className='home__loading-txt'>正在加载中...</Text>
            </View>
          }
          {!this.state.hasMore &&
            <View className='home__loading home__loading--not-more'>
              <Text className='home__loading-txt'>更多内容，敬请期待</Text>
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default Index 
