import Taro, { Component } from '@tarojs/taro'

const navigate = (url) => {
    Taro.navigateTo({ url: url });
};

export default navigate