import Taro from '@tarojs/taro'
import action from "../utils/action";
import request from "../utils/request";
import delay from "../utils/delay";

export default {
  namespace: 'feeds',
  state: {list: []},
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    saveMore(state, {payload: list}) {
      return {...state, list: [...state.list, ...list]};
    },
  },
  /* 
  🔴effects处理异步action 
  第一个参数：
    action
  第二个参数：
    yield => 标识每一步的操作(无论是同步还是异步)))
    call => 执行异步函数
    put => 相当于dispatch，发出一个Action
   */
  effects: {
    * search(_, {all, call, put}) {
      Taro.showLoading({
        title: '搜索中...',
      });
      try {
        let loadPro = yield put(action("load"));
        yield call(() => loadPro);
      } catch(err) {
        console.log('there is an error');
      } finally {
        Taro.hideLoading();
      }
    },
    * load({payload}, {all, call, put}) {
      let {data} = yield call(request, {
        url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", {list: data}))
    },
    * loadMore({payload}, {all, call, put}) {
      let {data} = yield call(request, {
        url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },
  },
};
