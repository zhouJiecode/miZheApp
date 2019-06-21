import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import './index.scss'

export default class AddrList extends Taro.PureComponent {
  static defaultProps = {
    list: []
  }

  handleClick = (id) => {
    Taro.navigateTo({
      url: `/pages/addAddr/index?id=${id}`
    })
  }

  render () {
    const { list } = this.props
    return (
      <View className='addr-list'>
        {list.map((item) => {
          const { id, userName, phoneNumber, addr, isDefault, tag } = item
          return (
            <View
              key={id}
              className='addr-list-item'
              onClick={this.handleClick.bind(this, id)}
            >
              {/* 用户名和电话号码 */}
              <View className='addr-list-item-con'>
                <Text className='addr-list-item-con-name'>{userName}</Text>
                <Text className='addr-list-item-con-phone'>{phoneNumber}</Text>
                <View className='addr-list-item-con-tags'>
                  {
                    isDefault && <AtTag className='error'>默认</AtTag>
                  }
                  {
                    tag && <AtTag className='primary'>{tag}</AtTag>
                  }
                </View>
              </View>

              {/* 用户详细地址 */}
              <View className='addr-list-item-addr'>
                <Text className='addr-list-item-addr-text'>{addr}</Text>
                <AtIcon className='font24' value='edit' size='12'></AtIcon>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
