import { API_ITEM } from '@constants/api'
import { observable } from 'mobx'
import fetch from '@utils/request'

// /**
//  * 首页数据
//  * @param {*} payload
//  */
// export const dispatchItem = payload => createAction({
//   url: API_ITEM,
//   type: ITEM_INFO,
//   payload
// })

// /**
//  * 推荐商品
//  * @param {*} payload
//  */
// export const dispatchItemRecommend = payload => createAction({
//   url: API_ITEM_RECOMMEND,
//   type: ITEM_RECOMMEND,
//   payload
// })

const itemStore = observable({
  itemInfo: {},
  async dispatchItem(payload) {
    const res = await fetch({ url: API_ITEM, payload, method: undefined })
    this.itemInfo = res || {}
  }
})
export default itemStore
