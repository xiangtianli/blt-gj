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
      wx.getSetting({
        success (res){
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            // wx.getUserInfo({
            //   success: function(res) {
            //     console.log(res.userInfo)
            //   }
            // })
          }else{
            console.log('wee')
            wx.navigateTo({
              url: "/pages/signIn/signIn?type=1",
              success:(res)=>{
                console.log(res)
              }
            })
          }
        }
      })
    },
    getUserInfo(cb) {
      console.log(this.globalData.userInfo)
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
        },fail:err=>{
          console.log(err)
        }
      })
    },
    globalData: {
      userInfo: null,
    }
  })
)
