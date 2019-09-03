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
	bindViewTap() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onShareAppMessage () {
		return {
		  title: '便民通生活',
		  desc: '生活的便民助手',
		  path: '/pages/index/index'
		}
	},
	onShow() {
	},
	async onLoad() {
		await delay()

		const log = flow(() => {
			console.log('is wechat mini program: ', __WECHAT__)
			console.log('is alipay mini program: ', __ALIPAY__)
			console.log('DEV: ', __DEV__)
		})
	}
}

const nextPageOption = connect(
	mapState,
	mapDispatch
)(pageOption)

Page(nextPageOption)
