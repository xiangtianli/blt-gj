
import {require} from './require'

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

export function drwaImg(canvasId,imgUrl,w,h,type,size){
  const ctx = wx.createCanvasContext(canvasId);
  const dw=size=='one'?295:size=='two'?295:295
  const dh=size=='one'?413:size=='two'?413:413
  const bgColor=type=="red"?'#f00':type=="blue"?'#0f0':'#f00'
  ctx.fillStyle=bgColor;
  // ctx.fillRect(0,0,w,h);
  // ctx.draw();
  console.log(imgUrl)
  ctx.drawImage(imgUrl,0,0,w,h,0,0,dw,dh);
  ctx.draw()
}

//图片扣人像
export function getBase64Image() {
  return new Promise((resolve,reject)=>{
    wx.chooseImage({
      success: req => {
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
export function  createImage(canvasId,imageWidth,imageHeight){
  wx.canvasToTempFilePath({     //将canvas生成图片
    canvasId: canvasId,
    x: 0,
    y: 0,
    width: imageWidth,
    height: imageHeight,
    destWidth: imageWidth,     //截取canvas的宽度
    destHeight: imageHeight,   //截取canvas的高度
    success: function (res) {
      wx.saveImageToPhotosAlbum({  //保存图片到相册
        filePath: res.tempFilePath,
        success: function () {
          wx.showToast({
            title: "生成图片成功！",
            duration: 2000
          })
        }
      })
    }
  })
}
