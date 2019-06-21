import {
  API_CART,
  API_CART_ADD, API_CART_UPDATE_CHECK
} from '@constants/api'

import Taro from '@tarojs/taro'
import fetch from '@utils/request'
import { observable } from 'mobx'

// TODO H5、RN 还不支持 setTabBarBadge
// const updateTabBar = (count) => {
//   if (count > 0) {
//     Taro.setTabBarBadge({
//       index: 2,
//       text: `${count}`
//     })
//   } else {
//     Taro.removeTabBarBadge({
//       index: 2
//     })
//   }
// }

const homeStore = observable({
  cartInfo: {},
  recommend: {},
  async dispatchCartNum() {
    // updateTabBar(action.payload.countCornerMark)
  },
  async dispatchAdd(params) {
    await fetch({ url: API_CART_ADD, params, method: 'POST' })
  },
  async dispatchCart() {
    const res = await fetch({ url: API_CART, params: {} })
    this.cartInfo = res
  },
  async dispatchUpdateCheck() {
    const res = await fetch({ url: API_CART_UPDATE_CHECK, params: {}, method: 'POST' })
    this.cartInfo = res
  }
})
export default homeStore
