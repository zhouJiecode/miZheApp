import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { ALL, PAYING, SHIPPING, SHIPED } from '@constants/orders'
import List from './list'

import './index.scss'

@inject('orders')
@observer
class Index extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '我的订单'
  }

  state = {
    loaded: false,
    current: 0,
    tabList: [{ title: '全部' }, { title: '待付款' }, { title: '待发货' }, { title: '已发货' }]
  }

  componentWillMount () {
    const index = [
      ALL,
      PAYING,
      SHIPPING,
      SHIPED
    ].indexOf(this.$router.params.type || ALL)

    this.setState({
      current: index >= 0 ? index : 0
    })
  }

  async componentDidMount() {
    const { orders } = this.props
    await orders.getOrderList()
    this.setState({
      loaded: true
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const { orders: { orderList } } = this.props
    const { loaded } = this.state

    return (
      <AtTabs current={this.state.current} tabList={this.state.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <List orderList={orderList} loaded={loaded} />
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <List orderList={orderList.filter(order => order.type === PAYING)} loaded={loaded} />
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <List orderList={orderList.filter(order => order.type === SHIPPING)} loaded={loaded} />
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3}>
          <List orderList={orderList.filter(order => order.type === SHIPED)} loaded={loaded} />
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default Index 
