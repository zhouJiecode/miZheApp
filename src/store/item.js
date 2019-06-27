import {observable} from "mobx"
// import fetch from "@utils/request"
import itemData from '../mock/item'

const itemStore = observable({
  itemInfo: {},
  async dispatchItem() {
    // const res = await fetch({ url: API_ITEM, params, method: undefined })
    this.itemInfo = itemData //res || {}
  }
})
export default itemStore
