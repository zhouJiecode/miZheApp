// import fetch from '@utils/request'
import { observable } from 'mobx'
import orders from '../mock/orders'

const orderStore = observable({
  orderList: [],
  async getOrderList() {
    // const res = await fetch({ url: API_CART_UPDATE_CHECK, params: {}, method: 'POST' })
    this.orderList = orders// res
  },
  async delOrder(id) {
    // const res = await fetch({ url: API_CART_UPDATE_CHECK, params: {}, method: 'POST' })
    const index = this.orderList.findIndex(order => id === order.id)
    if (index !== -1) {
      this.orderList.splice(index, 1)
    }
  }
})
export default orderStore
