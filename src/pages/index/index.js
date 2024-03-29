import { flow } from 'lodash'
import wxappRedux from '../../utils/wxapp-redux'
const connect = wxappRedux.connect

const delay = (t = 0) => new Promise(resolve => setTimeout(resolve, t))

// 获取应用实例
const app = getApp() //  eslint-disable-line no-undef

const mapState = state => ({
  count: state.count
})

const mapDispatch = ({ count: { increment, incrementAsync } }) => ({
  increment: () => increment(1),
  incrementAsync: () => incrementAsync(1)
})

const pageOption = {
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  // 事件处理函数
  bindViewTap () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow(){
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
            url: "/pages/signIn/signIn",
            success:(res)=>{
              console.log(res)
            }
          })
        }
      }
    })
  },
  async onLoad () {
    await delay()

    const log = flow(() => {
      console.log('is wechat mini program: ', __WECHAT__)
      console.log('is alipay mini program: ', __ALIPAY__)
      console.log('DEV: ', __DEV__)
    })
    log()

    // 调用应用实例的方法获取全局数据
    app.getUserInfo(userInfo => {
      // 更新数据
      this.setData({ userInfo })
    })
  }
}

const nextPageOption = connect(
  mapState,
  mapDispatch
)(pageOption)

Page(nextPageOption)
