import {drwaImg, getImgInfo, getBase64Image,createImage} from '../../utils/util'

Page({
	data: {
		title: 'idPtoto',
		imgUrl:'',
		w:'',
		h:'',
		oldUrl:''
	},
	oncliak(e){
		createImage('myCanvas',295,413)
	},
	// checkwh(e){
	// 	this.setData({
	// 		w:e.detail.width,
	// 		h:e.detail.height,
	// 	})
	// 	drwaImg('myCanvas', 'https://csdnimg.cn/pubfooter/images/csdn-zx.png', e.detail.width, e.detail.height,'red','one') 
	// },
	// getImg(){
	// 	getBase64Image().then(res=>{
	// 		this.setData({
	// 			imgUrl:'data:image/png;base64,'+res.res.foreground,
	// 			oldUrl:res.req.tempFilePaths[0]
	// 		})
	// 	})
	// },
	// onLoad(parmas) {
	// },
	onReady	(){
		
	}
});
