import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import Taro, { Component } from '@tarojs/taro'

import action from './utils/action'
import Index from './pages/index'
import dva from './dva'
import models from './model'

import './app.scss'

import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch(action("sys/error", e));
  },
});
const store = dvaApp.getStore();

class App extends Component {

  /* 
  🔴config是整个应用的全局的配置
  pages指定由哪些页面组成，不需要写文件后缀（数组的第一项代表小程序的初始页面)
  Window用于设置小程序的状态栏、导航条、标题、窗口背景色（navigationBarTitleText：标题栏文字内容）
  tab定义tab的各项内容
  */
  config = {
    pages: [
      // 'pages/result/result',
      'pages/home/home',
      'pages/result/result',
      'pages/usr/usr',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0068C4',
      navigationBarTitleText: 'taro',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#2A8CE5",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/home/home",
        text: "首页",
        iconPath: "./asset/images/index.png",
        selectedIconPath: "./asset/images/index_focus.png"
      },
      {
        pagePath: "pages/usr/usr",
        text: "我的",
        iconPath: "./asset/images/burger.png",
        selectedIconPath: "./asset/images/burger_focus.png"
      }]
    }
  }

  componentDidMount() {
    dvaApp.dispatch({ type: 'sys/test' })
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentCatchError() {
  }

  render() {
    return (<Provider store={store}>
      <Index />
    </Provider>);
  }
}

Taro.render(<App />, document.getElementById('app'))
