
const app = getApp()
Page({
	data: {
		title: 'center',
		userInfo: null
	},
	goBack(e){
		console.log(e)
		this.setData({
			userInfo: e.detail.userInfo
		})
	},
	onShow(params) {
		app.getUserInfo(userInfo => {
			// 更新数据
			this.setData({ userInfo })
		})
	},
});
