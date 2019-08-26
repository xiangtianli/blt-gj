export function require(data,url,header,method){
    const defaultHeader ={'content-type': 'application/json'}
    return new Promise((resolve,reject)=>{
        wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data,
        header: header || defaultHeader,
        method,
        success (res) {
            resolve(res.data)
        },
        fail(err){
            reject(err)
        }
      })
   })
}