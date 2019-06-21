import Taro from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import getAreaJson from './area.js'

import './index.scss'

import closePng from '../../assets/close.png'

export default class RegionSelect extends Taro.PureComponent {
  static defaultProps = {
    show: false,
    regionValue: [],
    onHide: () => {}
  }

  state = {
    area: getAreaJson(),
    hide: true,
    timeout: null,
    region: {
      tabs: [
        {
          name: '请选择',
          id: '',
        },
        {
          name: '请选择',
          id: '',
        },
        {
          name: '请选择',
          id: '',
        },
      ],
      select: 0,
    }
  }

  static getDerivedStateFromProps({ regionValue }) {
    if (regionValue && regionValue.length === 2) {
      let select = regionValue[2] && regionValue[2].id ? 2 : 0

      // 除最低级别区（select = 2）以外，需要获取当前级别下一级的数据
      return {
        region: {
          tabs: regionValue,
          select
        },
        area: this.getChildArea(select)
      }
    }

    return null
  }

  // componentWillReceiveProps({ show: nextShow }) {
  //   const { show } = this.props
  //   console.log(nextShow)
  //   console.log('nextShow')

  //   if (nextShow && !show) {
  //     this.showMask()
  //     // 显示
  //   } else if (!nextShow && show) {
  //     // 隐藏
  //     this.hideMask()
  //   }
  // }

  componentDidUpdate({ show: preShow }) {
    const { show } = this.props

    if (preShow && !show) {
      this.hideMask()
      // 隐藏
    } else if (!preShow && show) {
      // 显示
      this.showMask()
    }
  }

  showMask() {
    const { timeout } = this.state

    if (timeout) {
      clearTimeout(timeout)
    }
    this.setState({ hide: false, timeout: null })
  }

  hideMask() {
    const { timeout } = this.state

    if (timeout) {
      clearTimeout(timeout)
    }

    this.setState({ timeout: setTimeout(() => {
      this.setState({ hide: true })
    }, 200) })
  }

  // 关闭 picker 触发的方法
  emitHideRegion() {
    let { region } = this.state
    const { onHide } = this.props
    let addr = []

    if (region.tabs[2].id) {
      addr = region.tabs
    }

    onHide(addr)
  }

  bindRegionChange(id, name) {
    // 获取当前选中项的name和id并赋值给data中的数据
    let { region } = this.state
    region.tabs[region.select].id = id
    region.tabs[region.select].name = name
    this.setState({ region })

    // 除了三级以外的需要获取对应子选项
    if (region.select < 2) {
      region.select++
      this.setState({
        region,
        // 获取子选项
        area: this.getChildArea(region.select)
      })
    } else {
      // 三级选项选择完毕关闭省市区选择器
      this.emitHideRegion()
    }
  }

  getChildArea(level) {
    let { region } = this.state
    let _id = ''
    // 默认取完整的数据
    let _area = getAreaJson()
    // 根据层级取当前层级下的数据
    for (let i = 0; i < level; i++) {
      _id = region.tabs[i].id
      for (let j = 0; j < _area.length; j++) {
        if (_area[j].id === _id) {
          _area = _area[j]._child
          break
        }
      }
    }
    return _area
  }

  changeRegionLevel(level) {
    // 三级选项的tab点击无效果
    if (level === 2) return false
    let { region } = this.state
    // 当前选中tab和级别小于当前选中tab的状态都置为初始化状态
    for (let i = level; i < 3; i++) {
      region.tabs[i].id = ''
      region.tabs[i].name = '请选择'
    }
    region.select = level

    this.setState({
      region,
      area: this.getChildArea(level)
    })
  }

  render () {
    const { region, area, hide } = this.state
    const { show } = this.props

    return (
      <View className={'free-dialog ' + (show ? 'free-dialog--show' : '') + (hide ? ' hide' : '')}>
        <View className='free-dialog__mask' ref={(c) => { this.mask = c }} onClick={this.emitHideRegion.bind(this)}></View>
        <View className='free-dialog__container'>
          <View className='free-dialog__container__header'>
            <View>配送至</View>
            <View onClick={this.emitHideRegion.bind(this)}>
              <Image
                src={closePng}
                className='close'
              >
              </Image>
            </View> 
          </View>
          <View className='free-dialog__container__content'>
            <View className='free-content'>
              <View className='free-content__tabs'>
                {
                  region.tabs.filter((_, index) => index <= region.select).map((item, index) => {
                    return (
                      <View
                        className={'free-content__tabs__tab ' + (region.select === index ? 'select' : '')}
                        key={index}
                        onClick={() => this.changeRegionLevel.bind(this)(index)}
                      >
                        {item.name}
                      </View>
                    )
                  })
                }
              </View>
              <ScrollView className='free-content__scroll'>
                {
                  area.map(item => {
                    return (
                      <View
                        className='free-content__scroll__item'
                        key={item.id}
                        onClick={() => this.bindRegionChange.bind(this)(item.id, item.name)}
                      >
                        {item.name}
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </View>
        </View>
    </View>
    )
  }
}
