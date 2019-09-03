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
      wx.cloud.init()
      // wx.getSetting({
      //   success(res) {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      //     } else {
      //       console.log('wee')
      //       wx.navigateTo({
      //         url: "/pages/signIn/signIn",
      //         success: (res) => {
      //           console.log(res)
      //         }
      //       })
      //     }
      //   }
      // })
    },
    getUserInfo(cb) {
      if (this.globalData.userInfo) {
        typeof cb === 'function' && cb(this.globalData.userInfo)
        return
      }
      wx.getUserInfo({
        success: (res)=> {
          this.globalData.userInfo=res.userInfo
          cb(res.userInfo)
        },
        fail:err=>{
          
        }
      })
    },
    globalData: {
      userInfo: null,
    }
  })
)
