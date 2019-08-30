import wxappRedux from "../../utils/wxapp-redux";

Page({
	data: {
		title: '授权登录',
		type:'',
	},
	goBack(e){
		console.log(e)
		wx.showToast({
			title: "授权成功",
			icon:'none',
			duration: 1500,
			success:()=>{
			  setTimeout(function(){
				wx.navigateBack({
					delta: 1
				})
			  },1500)
			}
		})
		
	},
	onLoad(params) {
		console.log(params);
		if(params.type==="1"){
			this.setData({
				type:'getUserInfo'
			})
		}else if(params.type==="2"){
			this.setData({
				type:'openSetting'
			})
		}
	},
});
