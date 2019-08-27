const Crypto = require('./crypto');
const Base64 = require('./Base64')
require('./hmac')
require('./sha1')

export function uploadOss(file, dir){
    var policyText = {
        "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        "conditions": [
        ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
        ]
    };
    const accesskey='FDiX4HHKnuf9y8cdoGWD1uniBE9vbq'
    
    var policyBase64 = Base64.encode(JSON.stringify(policyText))
    const message = policyBase64
    var bytes =  Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
    var signature = Crypto.util.bytesToBase64(bytes);
    console.log(12344)
    return new Promise((resolve, reject)=>{
        let key = `${dir}${(new Date().getTime(), 'YY-MM-DD')}/${new Date().getTime()}.png`;
        console.log(key) 
      wx.uploadFile({
        url: 'https://lxt-block.oss-cn-beijing.aliyuncs.com', //仅为示例，非真实的接口地址
        filePath: file,
        name: 'file',
        formData: {
          name: file,
          key: key,
          policy: policyBase64,
          OSSAccessKeyId: 'LTAI4KGJoBAUNtMO',
          success_action_status: '200',
          signature: signature
        },
        success: function(res) {
          console.log(res)
          resolve(res)
        },
        fail: function(err){
          console.error(err)
          reject(err)
        }
      })
    })
  }