import {drwaImg, getImgInfo, getBase64Image,createImage, base64src } from '../../utils/util'
import {uploadOss} from '../../utils/uploadAliyun'
Page({
	data: {
		title: 'canvasUi',
		w:'',
		h:'',
		dw:'',
		dh:''
	},
	oncliak(e){
		const {type,size,w,h,localUrl,ossUrl,disabled} =this.data
		if(disabled){
			wx.showToast({
				title: "操作太快了，稍等片刻",
				duration: 1000
			})
			setTimeout(()=>{
				this.setData({
					disabled:false
				})
			},1500)
			return false
		}
		drwaImg('myCanvas', 'https://lxt-block.oss-cn-beijing.aliyuncs.com/temImg/1566981763367.png', w, h,'red','one',()=>{
			console.log(1234)
		}) 
		// if(localUrl && ossUrl && localUrl===ossUrl){
		// 	drwaImg('myCanvas', ossUrl, w, h,type,size,(res)=>{
		// 		this.setData({
		// 			disabled:res.state,
		// 			timeout:res.timeout
		// 		})
		// 	}) 
		// }else{
		// 	uploadOss( localUrl,'temImg').then(res=>{
		// 		this.setData({
		// 			ossUrl:res.url,
		// 			localUrl:res.url
		// 		})
		// 		drwaImg('myCanvas', res.url, w, h,type,size,(res)=>{
		// 			this.setData({
		// 				disabled:res.state,
		// 				timeout:res.timeout
		// 			})
		// 		}) 
		// 	})
		// }
	},
	onLoad(parmas) {
		console.log(parmas);
		const {w,h,dh,dw}=parmas
		this.setData({
			w,
			h,
			dh,
			dw,
		})
	},
});
