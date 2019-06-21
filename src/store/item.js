import {observable} from "mobx"
import fetch from "@utils/request"
// import { API_ITEM } from '@constants/api'
import itemData from '../mock/item'

const itemStore = observable({
  itemInfo: {},
  async dispatchItem(params) {
    // const res = await fetch({ url: API_ITEM, params, method: undefined })
    this.itemInfo = itemData //res || {}
  }
})
export default itemStore
