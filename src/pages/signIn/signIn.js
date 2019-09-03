import wxappRedux from "../../utils/wxapp-redux";

Page({
	data: {
		title: '授权登录',
		type:'',
	},
	goBack(e){
		console.log(e)
		let title="授权成功"
		if(e.detail.errMsg=='getUserInfo:fail auth deny'){
			title='授权失败'
		}else{
			title='授权成功'
		}
		wx.showToast({
			title: title,
			icon:'none',
			duration: 1500,
			success:()=>{
				// if(title=='授权成功'){
					setTimeout(function(){
					  wx.navigateBack({
						  delta: 1
					  })
					},1500)
				// }
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
