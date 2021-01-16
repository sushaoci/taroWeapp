/* 
准备加个模态框？消息通知，然后确定+清零
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './result.scss'
var sd = require('silly-datetime')

// import img from '../../asset/imgs/sample.jpg'
import { AtTag, AtCard, AtSlider, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

export default class Result extends Component {
  config = {
    navigationBarTitleText: '详情页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      name: '正在识别...',

      amount: 0,
      unit: 0,
      total: 0,

      sugarPer:0,
      proteinPer:0,
      fatPer:0,
      sugarTotal: 0,
      proteinTotal: 0,
      fatTotalr: 0,

      today:0,
      nowTime:0,

      identity:0,


      isOpened: false,
    }
  }

  componentDidMount() {
    var that = this
    var time1 = sd.format(new Date(), 'YYYY-MM-DD')
    var time2 = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    this.setState({
      today: time1,
      nowTime: time2
    })
    Taro.uploadFile({
      url: 'http://ali.circleliu.cn:8080/recognize',
      filePath: this.$router.params.img,
      name: 'img',
      formData: {
        'user': 'test'
      },
      success: function(res) {
        console.log(res)
        res = JSON.parse(res.data)
        that.setState({
          name: res['name'],
          unit: res['calorie']
        })
        wx.cloud.callFunction({
          name: "mysql",
          data: {
            a: [res['name']],
            b: "SELECT * FROM food WHERE Name = ?"
          },
          success(res2) {
            console.log("成功", res2)
            that.setState({
              sugarPer: res2.result[0].Sugar_100g,
              proteinPer: res2.result[0].Protein_100g,
              fatPer: res2.result[0].Fat_100g,
              identity: res2.result[0].ID
            })
          },
          fail(res2) {
            console.log("失败", res2)
          }
        })
        console.log(that.state)
      }
    })
  }
  
  navigateTo(url) {
    Taro.navigateTo({ url: url })
  }
  // 卡路里实时变化
  count = (e) => {
    this.setState({
      amount: e.value,
      total: e.value * (this.state.unit / 100),
      sugarTotal: e.value * (this.state.sugarPer / 100),
      proteinTotal: e.value * (this.state.proteinPer / 100),
      fatTotalr: e.value * (this.state.fatPer / 100)
    })
  }
  // 打开弹窗，提示成功
  openModal = (e) => {
    e.stopPropagation()
    console.log(this.state)
    this.setState({
      isOpened: true,
    })
    var that=this
    wx.cloud.callFunction({
      name: "mysql",
      data: {
        a: [that.state.nowTime, that.state.identity, that.state.amount],
        b: "INSERT INTO catering_record ( Date, food_ID,weight ) VALUES (?, ?, ?)"
      },
      success(res2) {
        console.log("成功", res2)
      },
      fail(res2) {
        console.log("失败", res2)
      }
    })
  }
  handleConfirm = (e) => {
    e.stopPropagation()
    console.log(this.state)
    var that=this
    wx.cloud.callFunction({
      name: "mysql",
      data: {
        a: [that.state.today],
        b: "SELECT * FROM oneDayIn WHERE date=?"
      },
      success(res2) {
        console.log("成功", res2.result[0])
        if (res2.result[0] == undefined){
          wx.cloud.callFunction({
            name: "mysql",
            data: {
              a: [that.state.today, that.state.total, that.state.sugarTotal, that.state.proteinTotal, that.state.fatTotalr],
              b: "INSERT INTO oneDayIn (date,oneDay_Calorie,oneDay_Sugar,oneDay_Protein,oneDay_Fat) VALUES (?, ?, ?,?,?)"
            },
            success(res3) {
              console.log("成功", res3)
            },
            fail(res3) {
              console.log("失败", res3)
            }
          })
        }
        else{
          console.log(res2.result[0].oneDay_Calorie )
          wx.cloud.callFunction({
            name: "mysql",
            data: {
              a: [res2.result[0].oneDay_Calorie + that.state.total, res2.result[0].oneDay_Sugar + that.state.sugarTotal, res2.result[0].oneDay_Protein + that.state.proteinTotal, res2.result[0].oneDay_Fat + that.state.fatTotalr, that.state.today],
              b: "UPDATE oneDayIn SET oneDay_Calorie=?, oneDay_Sugar=?,oneDay_Protein=?,oneDay_Fat=? WHERE date=?"
            },
            success(res3) {
              console.log("成功", res3)
            },
            fail(res3) {
              console.log("失败", res3)
            }
          })
        }
      },
      fail(res2) {
        console.log("失败", res2)
      }
    })
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
              成功添加{this.state.amount}克{this.state.name}<br />共{this.state.total}卡（含{this.state.sugarTotal}克糖、{this.state.proteinTotal}克蛋白质、{this.state.fatTotalr}克脂肪）到您的今日食谱
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
            <Image src={this.$router.params.img} className='image-captured' />
          </AtCard>
        </View>
        <View className='result-area'>
          <AtCard
            note={'（'+this.state.unit+'卡/100克）'}
            extra={this.state.total.toString()}
            title='请估算重量'
          >
            <AtSlider min={0} max={500} value={this.state.amount} showValue onChange={this.count}></AtSlider>
          </AtCard>
        </View>
        <View className='tags'>
          <AtTag>{this.state.name}</AtTag>
          <AtTag>{this.state.amount}克</AtTag>
          <AtTag>{this.state.total}卡</AtTag>
        </View>
        <View className='tags'>
          <AtTag>糖{this.state.sugarTotal}克</AtTag>
          <AtTag>蛋白质{this.state.proteinTotal}克</AtTag>
          <AtTag>脂肪{this.state.fatTotalr}克</AtTag>
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

