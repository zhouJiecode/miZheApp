import Taro from '@tarojs/taro'
// import fetch from '@utils/request'
import { observable } from 'mobx'
import cartList, { cartItem } from '../mock/cartList'

const homeStore = observable({
  cartList: [],
  selectedCount: 0,
  async dispatchCartNum() {
    // updateTabBar(action.payload.countCornerMark)
  },
  async dispatchAdd() {
    // await fetch({ url: API_CART_ADD, params, method: 'POST' })
    cartList.push(cartItem)
    this.cartList = JSON.parse(JSON.stringify(cartList))
  },
  async dispatchCart() {
    // const res = await fetch({ url: API_CART, params: {} })
    this.cartList = cartList
    this.selectedCount = this.cartList.map(item => item.checked).length
  },
  async dispatchUpdate({id, cnt}) {
    const cItem = cartList.find(item => item.id === id)
    if (cItem) {
      cItem.cnt = cnt
    }
    this.cartList = JSON.parse(JSON.stringify(cartList))
  },
  async dispatchUpdateCheck({checkedList = [], notCheckedList = []}) {
    // const res = await fetch({ url: API_CART_UPDATE_CHECK, params: {}, method: 'POST' })
    // this.cartInfo = res
    checkedList.forEach(id => {
      const cItem = cartList.find(item => item.id === id)
      if (cItem) {
        cItem.checked = true
      }
    })
    notCheckedList.forEach(id => {
      const ncItem = cartList.find(item => item.id === id)
      if (ncItem) {
        ncItem.checked = false
      }
    })
    this.cartList = JSON.parse(JSON.stringify(cartList))
  }
})
export default homeStore
