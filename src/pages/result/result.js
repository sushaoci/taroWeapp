/* 
准备加个模态框？消息通知，然后确定+清零
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './result.scss'

import img from '../../asset/imgs/sample.jpg'
import { AtTag, AtCard, AtSlider, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

export default class Result extends Component {
  config = {
    navigationBarTitleText: '详情页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      name: '随便一种食物',

      amount: 0,
      unit: 15,
      total: 0,

      isOpened: false,
    }
  }
  navigateTo(url) {
    Taro.navigateTo({ url: url })
  }
  // 卡路里实时变化
  count = (e) => {
    this.setState({
      amount: e.value,
      total: e.value * this.state.unit
    })
  }
  // 打开弹窗，提示成功
  openModal = (e) => {
    e.stopPropagation()
    this.setState({
      isOpened: true,
    })
  }
  handleConfirm = (e) => {
    e.stopPropagation()
    Taro.switchTab({
      url: '/pages/home/home'
    })
  }
  render() {
    return (
      <View className='result'>
        <AtModal className='modal' isOpened={this.state.isOpened}>
          <AtModalHeader>提示</AtModalHeader>
          <AtModalContent>
            <Text className='modal-text'>
              成功添加{this.state.amount}克{this.state.name}<br />共{this.state.total}千卡到您的今日食谱
            </Text>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
        <View className='image-area'>
          <AtCard
            extra={this.state.name}
            title='你吃的食物是'
          >
            <Image src={img} className='image-captured' />
          </AtCard>
        </View>
        <View className='result-area'>
          <AtCard
            note='（15千卡/克）'
            extra={this.state.total.toString()}
            title='请估算重量'
          >
            <AtSlider min={0} max={500} value={this.state.amount} showValue onChange={this.count}></AtSlider>
          </AtCard>
        </View>
        <View className='tags'>
          <AtTag>{this.state.name}</AtTag>
          <AtTag>{this.state.amount}克</AtTag>
          <AtTag>{this.state.total}千卡</AtTag>
        </View>
        <View className='submit-area'>
          <View className='at-row at-row__justify--around'>
            <View className='at-col at-col-5'>
              <AtButton type='secondary' onClick={this.openModal}> 提交</AtButton>
            </View>
          </View>
        </View>
        {/* <View className='user flex-wrp'>
          <View className='avatar flex-item'>
            <Image className='userinfo-avatar' src='https://image.ibb.co/nKV5Cy/default_avatar.jpg' backgroundSize='cover'></Image>
          </View>
          <View className='user-info flex-item'>
            <Text className='userinfo-nickname'>阿集</Text>
            <Text className='edit'>查看或编辑个人主页</Text>
          </View>
        </View>
        <View className='my'>
          <View className='my-item flex-wrp'>
            <View className='myitem-icon flex-item' >
            <Image class='myitem-img' src={eyePng}></Image>
            </View>
            <View className='myitem-name flex-item'>
              <Text>我的关注</Text>
            </View>
          </View>
        </View> */}
      </View>
    )
  }
}

