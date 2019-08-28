
import {require} from './require'
const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名
 
export function base64src(base64data, cb) {
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
  if (!format) {
    return (new Error('ERROR_BASE64SRC_PARSE'));
  }
  const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
  const buffer = wx.base64ToArrayBuffer(bodyData);
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath);
    },
    fail() {
      return (new Error('ERROR_BASE64SRC_WRITE'));
    },
  });
};

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}export function compare(value1, value2) {
  if(value1.date > value2.date){
      return -1;
  }else if(value1.date < value2.date){
      return 1;
  }else{
      return 0;
  }
}

export function drwaImg(canvasId,imgUrl,w,h,type,size,cb){
  cb({message:'正在生成',state:true})
  wx.getImageInfo({
    src: imgUrl,
    success (res) {
      console.log(res)
      const ctx = wx.createCanvasContext(canvasId)
      const dw=size=='one'?295:size=='twoIn'?413:size=='twoOut'?390:295
      const dh=size=='one'?413:size=='twoIn'?626:size=='twoOut'?567:413
      const bgColor=type=="red"?'rgb(255,0,0)':type=="blueOut"?'rgb(67,142,219)':type=="white"?'rgb(255,255,255)':type=="blueIn"?'rgb(60,140,220)':'rgb(255,0,0)'
      ctx.fillStyle=bgColor;
      // if(w>dw ||h>dh){
      //   ctx.fillRect(0,0,w,h);
      //   ctx.drawImage(imgUrl,0,0,w,h,0,0,dw,dh);
      // }else{
      // }
      ctx.fillRect(0,0,w,h);
      ctx.drawImage(res.path,0,0,w,h,0,0,w,h);
      ctx.draw()
    }
  })
}

//图片扣人像
export function getBase64Image() {
  return new Promise((resolve,reject)=>{
    wx.chooseImage({
      success: req => {
        console.log(req)
      let base64 = wx.getFileSystemManager().readFileSync(req.tempFilePaths[0], 'base64') 
      require({
          "grant_type":"client_credentials",
          "client_id":"fedQDvm9qkARL27o5EsgbGXC",
          "client_secret":"1co8rXV00lrXUGiN628TEEkSEyUANOUB",
        },"https://aip.baidubce.com/oauth/2.0/token").then(res=>{
        //出图片
          require({
            "access_token":res.access_token,
            "image":encodeURI(base64),
            // "type":'foreground',
          },'https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg',{
            "content-type":"application/x-www-form-urlencoded"
          },
          "POST").then(res=>{
            resolve({res,req})
          })
        })
      },
      fail(err){
        reject(err)
      }
    })
 }) 
}
export function  createImage(canvasId,size,cb){
  const dw=size=='one'?295:size=='twoIn'?413:size=='twoOut'?390:295
  const dh=size=='one'?413:size=='twoIn'?626:size=='twoOut'?567:413
  wx.canvasToTempFilePath({     //将canvas生成图片
    canvasId: canvasId,
    x: 0,
    y: 0,
    width: dw,
    height: dh,
    destWidth: dw,     //截取canvas的宽度
    destHeight: dh,   //截取canvas的高度
    success: function (res) {
      console.log(res)
      wx.saveImageToPhotosAlbum({  //保存图片到相册
        filePath: res.tempFilePath,
        success: function () {
          cb({message:'生成成功',state:false})
          wx.showToast({
            title: "生成图片成功！",
            duration: 2000
          })
        }
      })
    },
    fail(err){
      cb({message:'生成成功',state:false})
      console.log(err)
      cb({message:'生成失败'})
    }
  })
}
