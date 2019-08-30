 
//获取云数据库集合
export function getCollece(base,colle){
  const db =wx.cloud.database({
      env: base
  })
  const collece =db.collection(colle)
  return collece
}
//查
export function getData(collect,payload){
  return new Promise((resolve,reject)=>{
    collect.where(payload).get({
      success: res => {
        resolve(res)
      },
      fail: err => {
        wx.showToast({
          title: 'err',
          icon:'none'
        })
        reject(err)
      }
    })
  })
}
//增
export function addData(collect,payload){
  return new Promise((resolve,reject)=>{
    collect.add({
      data:payload,
      success: res => {
        resolve(res)
       
      },
      fail: err => {
        reject(err)
        wx.showToast({
          title: err,
          icon:'none'
        })
      }
    })
  })
}
//删
export function deleteData(collect,query){
  return new Promise((resolve,reject)=>{
    collect.doc(query).remove({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
        wx.showToast({
          icon: 'none',
          title: err,
        })
      }
    })
  })
}
//改
export function upData(collect,query,newData){
  return new Promise((resolve,reject)=>{
    collect.doc(query).update({
      data: newData,
      success: res => {
        resolve(res)
      },
      fail: err => {
        wx.showToast({
          title: err,
          icon:'none'
        })
        reject(err)
      }
    })
  })
}