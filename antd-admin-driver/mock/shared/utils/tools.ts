export function randomString(e?) {
  //形参e,需要产生随机字符串的长度   
  //如果没有传参，默认生成32位长度随机字符串
  e = e || 32;
  //模拟随机字符串库
  let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,//字符串t的长度，随机数生成最大值
    n = "";
  for (let i = 0; i < e; i++) {
    //随机生成长度为e的随机字符串拼接
    n += t.charAt(Math.floor(Math.random() * a));
  }
  //返回随机组合字符串
  return n
}
