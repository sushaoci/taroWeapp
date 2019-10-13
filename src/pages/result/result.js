import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './result.scss'

import img from '../../asset/imgs/sample.jpg'
import { AtCard, AtSlider, AtButton } from "taro-ui"

import navigate from '../../utils/navigate'

export default class Result extends Component {
  config = {
    navigationBarTitleText: '详情页'
  }
  render() {
    return (
      <View className='result'>
        <View className='image-area'>
          <Image src={img} className='image-captured' />
        </View>
        <View className='result-area'>
          <AtCard
            note='（n千卡/克）'
            extra='（实际多少卡）'
            title='你吃的食物是'
          >
            <AtSlider min={10} max={60}></AtSlider>
          </AtCard>
        </View>
        <View className='submit-area'>
          <View className='at-row at-row__justify--around'>
            <View className='at-col at-col-5'>
              <AtButton type='secondary' onClick={console.log('zidong??????')}> 提交</AtButton>
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

