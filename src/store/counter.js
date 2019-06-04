import { observable } from 'mobx'

const counterStore = observable({
  counter: 0,
  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.counter++
        resolve()
      }, 1000)
    })
  }
})
export default counterStore