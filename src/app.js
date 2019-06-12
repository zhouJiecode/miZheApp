import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import '@tarojs/async-await'
import Index from './pages/index'
import store from './store'

import './app.scss'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/home/home',
      'pages/user/user',
      'pages/cart/cart',
      'pages/user-login/user-login',
      'pages/user-login-email/user-login-email',
      'pages/webview/webview',
      'pages/item/item'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '蜜折',
      navigationBarTextStyle: 'black'
    },
    // tabBar: {
    //   color: "#666",
    //   selectedColor: "#b4282d",
    //   backgroundColor: "#fafafa",
    //   borderStyle: 'black',
    //   list: [{
    //     pagePath: "pages/home/home",
    //     iconPath: "./assets/tab-bar/home.png",
    //     selectedIconPath: "./assets/tab-bar/home-active.png",
    //     text: "首页"
    //   }, {
    //     pagePath: 'pages/cart/cart',
    //     iconPath: "./assets/tab-bar/cart.png",
    //     selectedIconPath: "./assets/tab-bar/cart-active.png",
    //     text: "购物车"
    //   }, {
    //     pagePath: 'pages/user/user',
    //     iconPath: "./assets/tab-bar/user.png",
    //     selectedIconPath: "./assets/tab-bar/user-active.png",
    //     text: "个人"
    //   }]
    // },
    // usingComponents: {
    //   'van-button' : './components/vant-app/button/index',
    //   'van-tabbar': './components/vant-app/tabbar/index',
    //   'van-tabbar-item': './components/vant-app/tabbar-item/index'
    // }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
