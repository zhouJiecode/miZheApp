import Taro from '@tarojs/taro'
import { Provider, observer, inject } from '@tarojs/mobx'
import '@tarojs/async-await'
import 'taro-ui/dist/style/index.scss'

import { compareVersion } from './utils'
import Index from './pages/index'
import store from './store'
import './app.scss'

@inject('app')
@observer
class App extends Taro.PureComponent {

  config = {
    pages: [
      'pages/home/home',
      'pages/user/user',
      'pages/cart/cart',
      'pages/webview/webview',
      'pages/item/item',
      'pages/addressMng/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '蜜折',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/home",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "首页"
      },
      {
        pagePath: 'pages/cart/cart',
        iconPath: "./assets/tab-bar/cart.png",
        selectedIconPath: "./assets/tab-bar/cart-active.png",
        text: "结算"
      },
      {
        pagePath: 'pages/user/user',
        iconPath: "./assets/tab-bar/user.png",
        selectedIconPath: "./assets/tab-bar/user-active.png",
        text: "个人"
      }]
    }
  }

  componentWillMount() {
    const version = Taro.getSystemInfoSync().SDKVersion

    // hideTabBar接口只支持微信基础库1.9.0及以上版本
    if (compareVersion(version, '1.9.0') < 0) {
      this.props.app.setEnableHideBar(false)
    } else {
      // 隐藏微信原生底部栏
      Taro.hideTabBar()
    }

    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            Taro.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              showCancel: true,
              confirmColor: '#73b4ef',
              cancelColor: '#003300',
              success: function ({ confirm }) {
                if (confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            Taro.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
      return
    }
    Taro.showModal({
      title: '提示',
      content: '当前微信版本过低，请升级到最新微信版本后重试。',
      showCancel: false,
      confirmColor: '#73b4ef',
      cancelColor: '#003300'
    })
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
