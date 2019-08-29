import {drwaImg,createImage,} from '../../utils/util'
Page({
	data: {
		title: 'canvasUi',
		w:'',
		h:'',
		dw:'',
		dh:'',
	},
	oncliak(e){
		const {dw,dh,w,h,type,size,imgUrl}=this.data
		drwaImg('myCanvas', imgUrl, dw, dh,type,w,h,()=>{
			createImage('myCanvas',dw,dh,size)
		}) 
	},
	onShow(){
	},
	onLoad(parmas) {
		console.log(parmas);
		const {w,h,type,size,imgUrl}=parmas
		const dw=size=='one'?295:size=='twoIn'?413:size=='twoOut'?390:295
		const dh=size=='one'?413:size=='twoIn'?626:size=='twoOut'?567:413
		this.setData({
			w,
			h,
			dh:dh*0.5,
			dw:dw*0.5,
			type,
			size,
			imgUrl
		})
	},
});
