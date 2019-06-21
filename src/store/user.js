import { USER_LOGOUT } from '@constants/user'
import { API_USER, API_USER_LOGIN } from '@constants/api'
import { observable } from 'mobx'
import fetch from '@utils/request'

const homeStore = observable({
  // 用户微信个人信息
  userInfo: {
    login: true,
    avatarUrl: '',
    city: '',
    country: '',
    gender: 1,
    language: '',
    nickName: '',
    province: ''
  },

  // 收货地址
  addrList: [],

  // 设置用户信息
  setUserInfo({ avatarUrl, city, country, gender, nickName, province }) {
    this.userInfo.nickName = nickName || ''
    this.userInfo.avatarUrl = avatarUrl || ''
    this.userInfo.city = city || ''
    this.userInfo.country = country || ''
    this.userInfo.gender = gender || ''
    this.userInfo.province = province || ''
  },

  // 获取用户收货地址列表
  async getUserAddrList() {
    // todo: 调用接口获取地址列表
    this.addrList = [{
      id: 1,
      userName: '周杰',
      phoneNumber: '158****1653',
      addr: '浙江省杭州市西湖区三潭映月xx号',
      isDefault: true,
      tag: ''
    }, {
      id: 2,
      userName: '周杰',
      phoneNumber: '158****1653',
      addr: '浙江省杭州市西湖区三潭映月xx号',
      isDefault: false,
      tag: '家'
    }, {
      id: 3,
      userName: '周杰',
      phoneNumber: '158****1653',
      addr: '浙江省杭州市西湖区三潭映月xx号',
      isDefault: false,
      tag: '公司'
    }, {
      id: 3,
      userName: '周杰',
      phoneNumber: '158****1653',
      addr: '浙江省杭州市西湖区三潭映月xx号',
      isDefault: false,
      tag: ''
    }]
  },

  async dispatchUser(payload) {
    await fetch({ url: API_USER, payload, method: undefined, fetchOptions: {
      showToast: false,
      autoLogin: false
    } })
  },
  async dispatchLogin(payload) {
    await fetch({ url: API_USER_LOGIN, payload, method: undefined })
  },
  dispatchLogout: () => ({ type: USER_LOGOUT })
})
export default homeStore
