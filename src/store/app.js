import {observable} from 'mobx'

const appStore = observable({
  enableHideBar: true,
  clientH: 603,
  clientW: 375,
  setEnableHideBar(enableHideBar) {
    this.enableHideBar = enableHideBar
  },
  setClientH(h) {
    this.clientH = h
  },
  setClientW(w) {
    this.clientW = w
  }
})
export default appStore
