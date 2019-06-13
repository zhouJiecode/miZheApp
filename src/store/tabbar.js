import { observable } from 'mobx'

const tabStore = observable({
  activeTab: 0,
  setActiveTab(index) {
    this.activeTab = index
  }
})
export default tabStore
