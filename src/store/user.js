import { USER_LOGOUT } from '@constants/user'
import { API_USER, API_USER_LOGIN } from '@constants/api'
// import { createAction } from '@utils/redux'

// /**
//  * 获取用户信息
//  * @param {*} payload
//  */
// export const dispatchUser = payload => createAction({
//   url: API_USER,
//   fetchOptions: {
//     showToast: false,
//     autoLogin: false
//   },
//   type: USER_INFO,
//   payload
// })

// /**
//  * 用户登录
//  * @param {*} payload
//  */
// export const dispatchLogin = payload => createAction({
//   url: API_USER_LOGIN,
//   type: USER_LOGIN,
//   payload
// })

// /**
//  * 用户退出登录
//  */
// export const dispatchLogout = () => ({ type: USER_LOGOUT })

import { observable } from 'mobx'
import fetch from '@utils/request'

const homeStore = observable({
  userInfo: {
    login: true,
    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLzQ47l2RKcDfyJ96Lfs2JyuDvy7W7Pqx8ulNpnQeGAtEotOTdWHCYHkibjZ3tuKV6O4bxEsGh9D4g/132",
    city: "Nanjing",
    country: "China",
    gender: 1,
    language: "zh_CN",
    nickName: "周杰",
    province: "Jiangsu",
  },
  setUserInfo({ avatarUrl, city, country, gender, nickName, province }) {
    this.userInfo.nickName = nickName || ''
    this.userInfo.avatarUrl = avatarUrl || ''
    this.userInfo.city = city || ''
    this.userInfo.country = country || ''
    this.userInfo.gender = gender || ''
    this.userInfo.province = province || ''
  },
  async dispatchUser(payload) {
    await fetch({ url: API_USER, payload, method: undefined, fetchOptions: {
      showToast: false,
      autoLogin: false
    } })
    // this.userInfo = {
    //   ...action.payload,
    //   login: true
    // }
  },
  async dispatchLogin(payload) {
    await fetch({ url: API_USER_LOGIN, payload, method: undefined })
  },
  dispatchLogout: () => ({ type: USER_LOGOUT })
})
export default homeStore
