/**
 * React Native 原生组件
 */
import Taro from '@tarojs/taro'
import { WebView } from 'react-native'

export default class WebViewRN extends Taro.PureComponent {
  render() {
    return (
      <WebView
        style={{ height: '100%' }}
        originWhitelist={['*']}
        source={{ uri: this.props.src }}
      />
    )
  }
}
