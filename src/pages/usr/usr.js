/* 
图表有点难加
参考：
https://github.com/harrydengchao/taro-chart-f2
https://github.com/antvis/f2
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './usr.scss'
var sd = require('silly-datetime')
var time1 = sd.format(new Date(), 'YYYY-MM-DD')

import { AtCard, AtList, AtListItem } from 'taro-ui'

const draw = [
  { chart: null, data: [] }
]
export default class Usr extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  constructor() {
    super(...arguments)
    this.state = {
      calorieTotal: 0,
      sugarTotal: 0,
      proteinTotal: 0,
      fatTotal: 0,
      today: time1,
    }
  }

    render() {
        var that = this
        console.log(this.state)
        wx.cloud.callFunction({
            name: "mysql",
            data: {
                a: [that.state.today],
                b: "SELECT * FROM oneDayIn WHERE date = ?"
            },
            success(res2) {
                console.log("成功", res2)
                that.setState({
                    calorieTotal: res2.result[0].oneDay_Calorie.toString(),
                    sugarTotal: res2.result[0].oneDay_Sugar.toString(),
                    proteinTotal: res2.result[0].oneDay_Protein.toString(),
                    fatTotal: res2.result[0].oneDay_Fat.toString()
                })
            },
            fail(res2) {
                console.log("失败", res2)
            }
        })
    console.log(this.state)
    return (
      <View className='usr'>
        <View className='user flex-wrp'>
          <View className='avatar flex-item'>
            <Image className='userinfo-avatar' src='https://image.ibb.co/nKV5Cy/default_avatar.jpg' backgroundSize='cover'></Image>
          </View>
          <View className='user-info flex-item'>
            <Text className='userinfo-nickname'>用户名</Text>
            <Text className='edit'>查看或编辑个人主页</Text>
          </View>
        </View>
        <View className='daily-info'>
          <AtCard title='今日摄入'>
            <AtList>
              <AtListItem title='热量' extraText={this.state.calorieTotal} iconInfo={{ size: 20, color: '#78A4FA', value: 'calendar' }} />
              <AtListItem title='糖分' extraText={this.state.sugarTotal} iconInfo={{ size: 20, color: '#FF4949', value: 'bookmark' }} />
              <AtListItem title='蛋白质' extraText={this.state.proteinTotal} iconInfo={{ size: 20, color: '#78A4FA', value: 'calendar' }} />
              <AtListItem title='脂肪' extraText={this.state.fatTotal} iconInfo={{ size: 20, color: '#FF4949', value: 'bookmark' }} />
            </AtList>
          </AtCard>
        </View>
        <View>
          准备加图表
        </View>
        <View className='tips'>
          <AtCard
            title='Tips'
          >
            <AtList>
              <AtListItem title='标题文字' extraText='详细信息' />
              <AtListItem title='标题文字' extraText='详细信息' />
              <AtListItem title='标题文字' extraText='详细信息' />
              <AtListItem title='标题文字' extraText='详细信息' />
            </AtList>
          </AtCard>
        </View>
      </View>
    )
  }
}

