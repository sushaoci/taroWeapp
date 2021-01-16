/* 🔴dva配置文件 */
import {create} from 'dva-core';
import {createLogger} from 'redux-logger';
import createLoading from 'dva-loading';
let app;
let store;
let dispatch;

function createApp(opt) {
  // 👍暂时关掉redux-logger
  // opt.onAction = [createLogger()];
  app = create(opt);
  app.use(createLoading({}));

  if (!global.registered) opt.models.forEach(model => app.model(model));
  global.registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
}
