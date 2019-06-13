import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Loading, TapBar } from '@components'
import { observer, inject } from '@tarojs/mobx'
import { getWindowHeight } from '@utils/style'
import Recommend from './recommend'

import './index.scss'

const RECOMMEND_SIZE = 20


@inject('home')
@inject('cart')
@observer
class Index extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '蜜折VIP'
  }

  state = {
    loaded: false,
    loading: false,
    hasMore: true
  }

  async componentDidMount() {
    const { home } = this.props

    await home.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
    this.loadRecommend()
  }

  componentWillMount () { }

  componentWillReact () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  loadRecommend = () => {
    const { home } = this.props
    if (!this.state.hasMore || this.state.loading) {
      return
    }

    const payload = {
      size: RECOMMEND_SIZE
    }
    this.setState({ loading: true })
    home.dispatchRecommend(payload).then(() => {
      this.setState({
        loading: false,
        hasMore: false
      })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { home: { recommend } } = this.props
    return (
      <View className='home page-con'>
        <ScrollView
          scrollY
          className='home__wrap'
          // style={{ height: getWindowHeight() }}
        >
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
        <TapBar></TapBar>
      </View>
    )
  }
}

export default Index 
