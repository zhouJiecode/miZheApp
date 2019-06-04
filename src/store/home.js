import {
  API_HOME, API_HOME_SEARCH_COUNT, API_HOME_RECOMMEND, API_HOME_PIN
} from '@constants/api'
import { observable } from 'mobx'
import fetch from '@utils/request'

const homeStore = observable({
  homeInfo: {},
  searchCount: 0,
  pin: [],
  recommend: [],
  async dispatchHome(payload) {
    const res = await fetch({ url: API_HOME, payload, method: undefined })
    this.homeInfo = res || {}
  },
  async dispatchSearchCount(payload) {
    const res = await fetch({ url: API_HOME_SEARCH_COUNT, payload, method: undefined })
    this.searchCount = res.count || 0
  },
  async dispatchPin(payload) {
    const res = await fetch({ url: API_HOME_PIN, payload, method: undefined })
    const pin = []
    res.forEach((item, index) => {
      const groupIndex = parseInt(index / 3)
      if (!pin[groupIndex]) {
        pin[groupIndex] = []
      }
      pin[groupIndex].push(item)
    })
    this.pin = pin || []
  },
  async dispatchRecommend(payload) {
    const res = await fetch({ url: API_HOME_RECOMMEND, payload, method: undefined })
    this.recommend = this.recommend.concat(res.rcmdItemList || [])
  }
})
export default homeStore
