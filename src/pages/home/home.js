import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './home.scss'

import { AtButton } from 'taro-ui'

export default class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  navigateTo(url) {
    Taro.navigateTo({ url: url })
  }
  render() {
    return (
      <View className='home'>
        <View className='at-row at-row__justify--around'>
          <View className='at-col at-col-5'>
            <AtButton type='primary' onClick={this.navigateTo.bind(this, '/pages/result/result')}> 拍照记录</AtButton>
          </View>
          <View className='at-col at-col-5'>
            <AtButton type='secondary'>相册导入</AtButton>
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

