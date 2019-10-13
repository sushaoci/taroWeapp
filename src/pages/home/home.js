import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import './home.scss'

export default class More extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  render () {
    return (
      <View className='home'>
        <Text>这里是首页</Text>
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

