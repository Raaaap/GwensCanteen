// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({ //此方法是专门用来给http协议发请求的
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6b57654bbf4adf97&secret=8c4991cdab7f816f5bcccd1c9dfc3b67&js_code='+res.code+'&grant_type=authorization_code',
            success(result){
                var openid = result.data.openid;
                console.log(openid+"....")
                //将获取到的openid的值赋值给globaldata中的全局变量
                getApp().globalData.openid = openid;
            }
          })
        }
    })
  },
  globalData: {
     //定义一个标记,用户标记用户是否登录
     //false表示未登录 true表示已登录
     isLogin : false,
     //定义openid为全局变量
     openid : ""
  }
})
