// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var result= await db.collection("book")
  .where({
   _openid:event._openid
  })
  .get()
  return result
}