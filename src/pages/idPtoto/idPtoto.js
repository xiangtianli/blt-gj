import {drwaImg, getImgInfo, getBase64Image,createImage, base64src } from '../../utils/util'
import {uploadOss} from '../../utils/uploadAliyun'
Page({
	data: {
		imgUrl:'',
		w:'',
		h:'',
		type:'red',
		size:'one',
		oldUrl:'',
		localUrl:null,
		ossUrl:null,
		disabled:false,
		types: [
			{name: 'red', value: '红底',checked: 'true'},
			{name: 'blueOut', value: '护照'},
			{name: 'blueIn', value: '蓝底'},
			{name: 'white', value: '白底'},
		],
		sizes: [
			{name: 'one', value: '一寸',checked: 'true'},
			{name: 'twoIn', value: '两寸'},
			{name: 'twoOut', value: '护照两寸'},
		]
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
		drwaImg('myCanvas', ossUrl, w, h,type,size,(res)=>{
			this.setData({
				disabled:res.state,
				timeout:res.timeout
			})
		}) 
		if(localUrl && ossUrl && localUrl===ossUrl){
			drwaImg('myCanvas', ossUrl, w, h,type,size,(res)=>{
				this.setData({
					disabled:res.state,
					timeout:res.timeout
				})
			}) 
		}else{
			uploadOss( localUrl,'temImg').then(res=>{
				this.setData({
					ossUrl:res.url,
					localUrl:res.url
				})
				drwaImg('myCanvas', res.url, w, h,type,size,(res)=>{
					this.setData({
						disabled:res.state,
						timeout:res.timeout
					})
				}) 
			})
		}
	},
	changeType(e){
		this.setData({
			type:e.detail.value
		})
	},
	changeSize(e){
		this.setData({
			size:e.detail.value
		})
	},
	checkwh(e){
		this.setData({
			w:e.detail.width,
			h:e.detail.height,
		})
	},
	getImg(){
		getBase64Image().then(req=>{
			base64src('data:image/jpeg;base64,'+req.res.foreground,(res)=>{
				this.setData({
					imgUrl:'data:image/jpeg;base64,'+req.res.foreground,
					localUrl:res,
					oldUrl:req.req.tempFilePaths[0]
				})
			})
		})
	},
	onLoad(parmas) { 
	},
	onReady	(){
		
	}
});
