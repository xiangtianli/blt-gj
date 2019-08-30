
const app = getApp() 
Page({
	data: {
		title: 'center',
		userInfo:null
	},

	onLoad(params) {
		console.log(app);

		this.setData({
			userInfo:app.globalData.userInfo
		})
	},
});
