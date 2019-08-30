
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

export function drwaImg(canvasId,imgUrl,dw,dh,type,w,h,cb){
  
    wx.getImageInfo({
      src: imgUrl,
      success (res) {
        console.log(res)
        const ctx = wx.createCanvasContext(canvasId)
        const bgColor=type=="red"?'rgb(255,0,0)':type=="blueOut"?'rgb(67,142,219)':type=="white"?'rgb(255,255,255)':type=="blueIn"?'rgb(60,140,220)':'rgb(255,0,0)'
        ctx.fillStyle=bgColor;
        ctx.fillRect(0,0,dw,dh);
        ctx.drawImage(res.path,0,0,w,h,0,0,dw,dh);
        ctx.draw(false,cb)
      }
    })
  // }).catch(err=>{
  //   if(err.code===1){
  //     wx.showToast({
  //       title: "监测到您还没有授权，请前往授权",
  //       icon:'none',
  //       duration: 1500,
  //       success:()=>{
  //         setTimeout(function(){
  //           wx.navigateTo({
  //             url: "/pages/signIn/signIn?type=2",
  //             success:(res)=>{
  //             }
  //           })
  //         },1500)
  //       }
  //     })
  //   }else{
  //     Error(err)
  //   }
  // })
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
          require({
            "access_token":res.access_token,
            "image":encodeURI(base64),
            // "type":'foreground',
          },'https://aip.baidubce.com/rest/2.0/image-classify/v1/body_analysis',{
            "content-type":"application/x-www-form-urlencoded"
          },
          "POST").then(res=>{
            if(res.person_num===0){
              reject({msg:'未检测到人脸，请从新上传'})
            }
            if(res.person_num>1){
              reject({msg:'监测到人脸数量过多,请从新上传'})
            }
            if(res.person_num===1){
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
            }
          })
        })
      },
      fail(err){
        reject(err)
      }
    })
 }) 
}
//二次授权问题
export function authSetting(type){
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success :(res)=>{
        if(res.authSetting[type]){
          return resolve(res)
        }else{
          wx.openSetting()
          return reject({code:1})
        }
      },
      fail :(err)=>{
        return reject({code:0,result:err})
      }
    })
  })
}

//生成照片
export function  createImage(canvasId,dw,dh,size){
  const w=size=='one'?295:size=='twoIn'?413:size=='twoOut'?390:295
  const h=size=='one'?413:size=='twoIn'?626:size=='twoOut'?567:413
  wx.canvasToTempFilePath({     //将canvas生成图片
    canvasId: canvasId,
    x: 0,
    y: 0,
    width: w,
    height: h,
    destWidth: w,
    destHeight: h, 
    fileType:'jpg',
    quality:0.5,
    success: function (res) {
      console.log(res)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function () {
          wx.showToast({
            title: "生成图片成功！",
            duration: 2000
          })
        },fail:(err=>{
          wx.showToast({
            title: "监测到您还没有授权，请前往授权",
            icon:'none',
            duration: 1500,
            success:()=>{
              wx.openSetting()
            }
          })
        })
      })
    },
  })
}
