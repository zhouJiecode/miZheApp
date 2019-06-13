// import {
//   CART_INFO, CART_NUM, CART_RECOMMEND,
//   CART_ADD, CART_UPDATE, CART_UPDATE_CHECK
// } from '@constants/cart'
import {
  API_CART,
  API_CART_ADD, API_CART_UPDATE_CHECK
} from '@constants/api'
// import { createAction } from '@utils/redux'

// /**
//  * 购物车信息
//  * @param {*} payload
//  */
// export const dispatchCart = payload => createAction({
//   url: API_CART,
//   type: CART_INFO,
//   payload
// })

// /**
//  * 购物车物品数量
//  * @param {*} payload
//  */
// export const dispatchCartNum = payload => createAction({
//   url: API_CART_NUM,
//   fetchOptions: {
//     showToast: false,
//     autoLogin: false
//   },
//   type: CART_NUM,
//   payload
// })

// /**
//  * 购物车推荐
//  * @param {*} payload
//  */
// export const dispatchRecommend = payload => createAction({
//   url: API_CART_RECOMMEND,
//   type: CART_RECOMMEND,
//   payload
// })

// /**
//  * 添加商品到购物车
//  * @param {*} payload
//  */
// export const dispatchAdd = payload => createAction({
//   url: API_CART_ADD,
//   method: 'POST',
//   type: CART_ADD,
//   payload
// })

// /**
//  * 更新商品信息
//  * @param {*} payload
//  */
// export const dispatchUpdate = payload => createAction({
//   url: API_CART_UPDATE,
//   method: 'POST',
//   type: CART_UPDATE,
//   payload
// })

// /**
//  * 更新商品选中状态
//  * @param {*} payload
//  */
// export const dispatchUpdateCheck = payload => createAction({
//   url: API_CART_UPDATE_CHECK,
//   method: 'POST',
//   type: CART_UPDATE_CHECK,
//   payload
// })

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
