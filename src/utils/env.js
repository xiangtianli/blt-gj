var config = {
  aliyunServerURL:"https://lxt-block.oss-cn-beijing.aliyuncs.com",
  //aliyun OSS config
  uploadImageUrl: `tmpImgs/`, //默认存在根目录，可根据需求改
  AccessKeySecret: 'FDiX4HHKnuf9y8cdoGWD1uniBE9vbq',
  OSSAccessKeyId: 'LTAI4KGJoBAUNtMO',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config