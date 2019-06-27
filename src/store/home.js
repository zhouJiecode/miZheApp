import { observable } from "mobx"
import fetch from "@utils/request"
import listData from '../mock/list'

const homeStore = observable({
  recommend: [],
  async dispatchRecommend(params) {
    // const res = await fetch({ url: API_HOME_RECOMMEND, params, method: undefined })
    this.recommend = listData // this.recommend.concat(res.rcmdItemList || [])
  }
})
export default homeStore
