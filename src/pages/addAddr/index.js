import Taro from '@tarojs/taro'
import { View, Image, Button, Label } from '@tarojs/components'
import { AtInput, AtForm, AtTag, AtIcon, AtSwitch } from 'taro-ui'
import { RegionSelect } from '@components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

import addPersonPng from '../../assets/addPerson.png'

@inject('user')
@observer
class Index extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '新建收货地址'
  }

  state = {
    name: '',
    address: '',
    isDefault: false,
    showRegionSelect: false,
    tags: ['家', '公司', '学校']
  }

  componentWillMount () {
    
  }

  saveAddr() {
    Taro.showToast({
      title: '保存成功',
      icon: 'none'
    })
    Taro.navigateBack({ delta: 1 })
  }

  handleNameChange(name) {
    this.setState({ name })
  }

  handleShowRegionSelect() {
    this.setState({ showRegionSelect: true })
  }

  onRegionSelectHide(address) {
    this.setState({ showRegionSelect: false })
    if (address) {
      this.setState({ address })
    }
  }

  addTag() {

  }

  handleDefaultChange(isDefault) {
    console.log(arguments)
    this.setState({ isDefault })
  }

  render () {
    const { name, showRegionSelect, address, tags, isDefault } = this.state

    return (
      <View className='addr'>
        <AtForm className='addr__wrap no-border'>
          <AtInput
            name='name'
            title='收货人'
            type='text'
            placeholder='请填写收货人姓名'
            value={name}
            onChange={this.handleNameChange.bind(this)}
          >
            <Image className='addr__wrap_addperson' src={addPersonPng} />
          </AtInput>
          <AtInput
            name='phone'
            title='手机号码'
            type='text'
            placeholder='请填写收货人手机号'
            value={name}
            onChange={this.handleNameChange.bind(this)}
          />
          <AtInput
            name='phone'
            title='所在地区'
            type='text'
            className='opacity1'
            placeholder='省市区县、乡镇等'
            editable={false}
            value={address}
            onClick={this.handleShowRegionSelect.bind(this)}
            onChange={this.handleNameChange.bind(this)}
          />
          <RegionSelect
            show={showRegionSelect}
            onHide={this.onRegionSelectHide.bind(this)}
          ></RegionSelect>
          <AtInput
            name='phone'
            title='详细地址'
            type='text'
            placeholder='街道、楼牌号等'
            value={name}
            onChange={this.handleNameChange.bind(this)}
          />
          <View className='at-input at-input--without-border'>
            <View className='at-input__container'>
              <View className='at-input__overlay at-input__overlay--hidden'></View>
              <Label className='at-input__title'>标签</Label>
              <View className='at-input__children-con'>
                {
                  tags.map(tag => {
                    return (
                      <AtTag key={tag} className='default mr10'>{tag}</AtTag>
                    )
                  })
                }
                <Button type='default' className='add-tag' onClick={this.addTag.bind(this)}>
                  <AtIcon className='mr5 mt-3' value='add' size='12' color='#333'></AtIcon>
                </Button>
              </View>
            </View>
          </View>
          <View className='at-input at-input--without-border'>
            <View className='at-input__container block'>
              <View className='at-input__overlay at-input__overlay--hidden'></View>
              <Label className='at-input__title'>设为默认地址</Label>
              <View className='at-input__children-con block'>
                <View>
                  提醒：每次下单时会使用该地址
                </View>
                <AtSwitch border={false} checked={isDefault} onChange={this.handleDefaultChange.bind(this)} />
              </View>
            </View>
          </View>
        </AtForm>
        <Button type='warn' className='addr-savebtn' onClick={this.saveAddr.bind(this)}>
          保存
        </Button>
      </View>
    )
  }
}

export default Index 
