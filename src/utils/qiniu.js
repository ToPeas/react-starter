/**
 * Created by mac on 2017/6/8.
 */


const qiniu = require("qiniu");

// const config = require('../config').default
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '5ub9CSO3j-AmjwRAlhOxbnJhjwI2F1vA0ZoYcsf3';
qiniu.conf.SECRET_KEY = 'xnxEGgq21Rlgr9rgCM5fy8ACsHScRx5gwA6vE46-';
//要上传的空间
let bucket = 'test';
//上传到七牛后保存的文件名
let key = 'logo.svg';
//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
  let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  // putPolicy.callbackUrl = 'http://your.domain.com/callback';
  // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
  return putPolicy.token();
}
//生成上传 Token
let token = uptoken(bucket, key);
//要上传文件的本地路径
let filePath = '../asset/imgs/logo.svg'
//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
}
//调用uploadFile上传
uploadFile(token, key, filePath);