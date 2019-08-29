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
		show:false,
		localUrl:null,
		ossUrl:null,
		disabled:true,
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
					oldUrl:req.req.tempFilePaths[0],
					disabled:false
				})
			})
		}).catch(err=>{
			wx.showToast({
				title: err.msg,
				icon:'none',
				duration: 2000
			})
		})
	},
	goCanvas(){
		this.setData({
			show:true
		})
		const {type,size,w,h,localUrl,} =this.data
		uploadOss(localUrl,'tmpImg').then(res=>{
			wx.navigateTo({
				url: `/pages/canvasUi/canvasUi?imgUrl=${res.url}&type=${type}&w=${w}&h=${h}&size=${size}`   //实际路径要写全
			})
			this.setData({
				show:false
			})
		})
	},
	onReady	(){
		
	}
});
