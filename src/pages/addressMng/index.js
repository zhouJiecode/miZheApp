import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { Loading } from '@components'
import { observer, inject } from '@tarojs/mobx'
import AddrList from './addrList'

import './index.scss'

@inject('user')
@observer
class Index extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '收货地址管理'
  }

  state = {
    loaded: false
  }

  componentWillMount () {
    this.$preloadData.then(() => {
      this.setState({ loaded: true })
    })
  }

  componentWillPreload () {
    const { user } = this.props
    return user.getUserAddrList()
  }

  addAddr() {
    Taro.navigateTo({
      url: `/pages/addAddr/index`
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { user: { addrList: list } } = this.props
    return (
      <View className='addr'>
        <ScrollView
          scrollY
          className='addr__wrap'
        >
          {list.length &&
            <AddrList list={list}></AddrList>
          }

          {!list.length &&
            <View className='home__loading home__loading--not-more'>
              <Text className='home__loading-txt'>暂无内容</Text>
            </View>
          }
        </ScrollView>
        <Button type='warn' className='addr-addbtn' onClick={this.addAddr.bind(this)}>
          <AtIcon className='mr5 mt-4' value='add' size='12' color='#fff'></AtIcon>
          新建地址
        </Button>
      </View>
    )
  }
}

export default Index 
