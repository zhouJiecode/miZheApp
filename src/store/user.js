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
    login: true
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
