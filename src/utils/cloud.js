 
 //获取云数据库集合
 export function getCollece(base,colle){
    const db =wx.cloud.database({
        env: base
    })
    const collece =db.collection(colle)
    return collece
  }