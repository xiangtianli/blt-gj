import { camelCase } from 'lodash'
import { init } from '@rematch/core'
import immerPlugin from '@rematch/immer'
import loadingPlugin from '@rematch/loading'

import count from './models/count'
import wxappRedux from './utils/wxapp-redux'
const Provider = wxappRedux.Provider

const store = init({
  models: { count },
  plugins: [immerPlugin(), loadingPlugin()]
})

App(
  Provider(store)({
    onLaunch() {
      console.log(camelCase('OnLaunch'))
      wx.cloud.init()
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    },
    getUserInfo(cb) {
      if (this.globalData.userInfo) {
        typeof cb === 'function' && cb(this.globalData.userInfo)
        return
      }
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              typeof cb === 'function' && cb(this.globalData.userInfo)
            }
          })
        }
      })
    },
    globalData: {
      userInfo: null,
    }
  })
)
