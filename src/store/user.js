import { observable } from 'mobx'
// import fetch from '@utils/request'
import userAddrList from '../mock/userAddr'

const homeStore = observable({
  // 用户微信个人信息
  userInfo: {
    login: false,
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
    this.userInfo.login = true
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
    this.addrList = userAddrList
  }
})
export default homeStore
