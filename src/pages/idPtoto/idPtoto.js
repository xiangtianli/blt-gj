import {drwaImg, getImgInfo, getBase64Image,createImage} from '../../utils/util'
import {uploadFile} from '../../utils/uploadAliyun'
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
	checkwh(e){
		this.setData({
			w:e.detail.width,
			h:e.detail.height,
		})
		drwaImg('myCanvas', 'https://csdnimg.cn/pubfooter/images/csdn-zx.png', e.detail.width, e.detail.height,'red','one') 
	},
	getImg(){
		getBase64Image().then(res=>{
			this.setData({
				imgUrl:'data:image/png;base64,'+res.res.foreground,
				oldUrl:res.req.tempFilePaths[0]
			})
		})
	},
	onLoad(parmas) {
		wx.chooseImage({  
	       count: 1, // 默认9  
	       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
	       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
	       success: function (res) {  
	        //  返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
			 uploadFile( 
				{
					filePath: res.tempFilePaths[0],
					dir: "images/",
					success: function (res) {
					  console.log("上传成功")
					},
					fail: function (res) {
					  console.log("上传失败")
					  console.log(res)
					}
				}
			)
	       }  
	     })  
		console.log(uploadFile)
	},
	onReady	(){
		
	}
});
