import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './usr.scss'

import { AtCard, AtList, AtListItem } from 'taro-ui'

export default class Usr extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  render() {
    return (
      <View className='usr'>
        <View className='user flex-wrp'>
          <View className='avatar flex-item'>
            <Image className='userinfo-avatar' src='https://image.ibb.co/nKV5Cy/default_avatar.jpg' backgroundSize='cover'></Image>
          </View>
          <View className='user-info flex-item'>
            <Text className='userinfo-nickname'>阿集</Text>
            <Text className='edit'>查看或编辑个人主页</Text>
          </View>
        </View>
        <View className='daily-info'>
          <AtCard
            title='今日摄入'
          >
            <AtList>
              <AtListItem title='标题文字' extraText='详细信息' />
              <AtListItem title='标题文字' extraText='详细信息' />
              <AtListItem title='标题文字' extraText='详细信息' />
              <AtListItem title='标题文字' extraText='详细信息' />
            </AtList>
          </AtCard>
        </View>
        <View>
          
        </View>
      </View>
    )
  }
}

