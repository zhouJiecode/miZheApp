import {observable} from 'mobx'

const appStore = observable({
  enableHideBar: true,
  setEnableHideBar(enableHideBar) {
    this.enableHideBar = enableHideBar
  }
})
export default appStore
