import {
  API_HOME, API_HOME_RECOMMEND
} from '@constants/api'
import { observable } from 'mobx'
import fetch from '@utils/request'

const homeStore = observable({
  homeInfo: {},
  recommend: [],
  async dispatchHome(payload) {
    const res = await fetch({ url: API_HOME, payload, method: undefined })
    this.homeInfo = res || {}
  },
  async dispatchRecommend(payload) {
    const res = await fetch({ url: API_HOME_RECOMMEND, payload, method: undefined })
    this.recommend = this.recommend.concat(res.rcmdItemList || [])
  }
})
export default homeStore
