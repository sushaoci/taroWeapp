import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import './question.scss'

import img1 from '../../asset/images/eye.png'
import img2 from '../../asset/images/comment2.png'
import img3 from '../../asset/images/invite.png'
import img4 from '../../asset/images/write.png'
import img5 from '../../asset/images/icon1.jpeg'

export default class Question extends Component {
  config = {
    navigationBarTitleText: '问题'
  }
  constructor() {
    super(...arguments)
  }
  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
  render () {
    return (
        <View>
          {/* 邀请回答/写回答👆的部分 */}
          <View className='question-wrp'>
              <View className='question-item'>
                  <View className='que-tag'>
                      <Text className='tag'>阅读</Text>
                      <Text className='tag'>电子书</Text>
                      <Text className='tag'>Kindle</Text>
                      <Text className='tag'>书籍</Text>
                      <Text className='tag'>文学</Text>
                  </View>
                  <View className='que-title'>
                      选择 Kindle 而不是纸质书的原因是什么？
                  </View>
                  <View className='que-content'>
                      WEB前端*不靠谱天气预报员*想做代码小仙女
                  </View>
                  <View className='que-follow'>
                      <View className='left'>
                          <View className='watch'>
                              <Image src={img1}></Image>
                              <Text>3316</Text>
                          </View>
                          <View className='comment'>
                              <Image src={img2}></Image>
                              <Text>27</Text>
                          </View>
                      </View>
                      <View className='right'>
                          关注
                      </View>
                  </View>
              </View>
              <View className='que-operate flex-wrp'>
                  <View className='invite flex-item'>
                      <Image src={img3}></Image>
                      <Text>邀请回答</Text>
                  </View>
                  <View className='write flex-item'>
                      <Image src={img4}></Image>
                      <Text>写回答</Text>
                  </View>
              </View>
          </View>
          {/* 回答的部分 */}
          <View className='answer-feed'>
              <View className='feed-item'>
                  <View className='feed-source'>
                      <View>
                          <View className='avatar'>
                              <Image src={img5}></Image>
                          </View>
                          <Text className='answer-name'>Rebecca</Text>
                      </View>
                  </View>
                  <View className='feed-content'>
                      <View className='answer-body'>
                          <View onClick={this.navigateTo.bind(this,'/pages/answer/answer')}>
                              <Text className='answer-txt'>难道不明白纸质书更贵啊！！！ 若觉得kindle更贵，我觉得要么阅读量太少，那确实没有买kindle的必要。要么买的都是盗版的纸质书？我不清楚不加以评论。。。 另外，用kindle看小说的... </Text>
                          </View>
                          <View className='answer-actions'>
                              <View className='like dot'>
                                  <View>3.9K 赞同 </View>
                              </View>
                              <View className='comments dot'>
                                  <View>254 评论 </View>
                              </View>
                              <View className='time'>
                                  <View>2 个月前</View>
                              </View>
                          </View>
                      </View>
                  </View>
              </View>
              <View className='feed-item'>
                  <View className='feed-source'>
                      <View>
                          <View className='avatar'>
                              <Image src={img5}></Image>
                          </View>
                          <Text className='answer-name'>Rebecca</Text>
                      </View>
                  </View>
                  <View className='feed-content'>
                      <View className='answer-body'>
                          <View onClick={this.navigateTo.bind(this,'/pages/answer/answer')}>
                              <Text className='answer-txt'>难道不明白纸质书更贵啊！！！ 若觉得kindle更贵，我觉得要么阅读量太少，那确实没有买kindle的必要。要么买的都是盗版的纸质书？我不清楚不加以评论。。。 另外，用kindle看小说的... </Text>
                          </View>
                          <View className='answer-actions'>
                              <View className='like dot'>
                                  <View>3.9K 赞同 </View>
                              </View>
                              <View className='comments dot'>
                                  <View>254 评论 </View>
                              </View>
                              <View className='time'>
                                  <View>2 个月前</View>
                              </View>
                          </View>
                      </View>
                  </View>
              </View>
          </View>
        </View>
    )
  }
}



