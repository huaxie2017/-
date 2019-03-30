//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
              this.globalData.userInfo = res.userInfo
              this.globalData.encryptedData = res.encryptedData
              this.globalData.rawData = res.rawData
              this.globalData.signature = res.signature
              this.globalData.iv = res.iv
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getUserDataToken: function () {
    wx.login({
      success: function (res) {
        var code = res['code'];
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          success: function (info) {
            console.log(info);
            var rawData = info['rawData'];
            var signature = info['signature'];
            var encryptData = info['encryptData'];
            var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
            var iv = info['iv'];

            //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            wx.request({
              url: 'https://efix.ewiyi.com/api/default/wxProgramLogin',
              data: {
                "code": code,
                "rawData": rawData,
                "signature": signature,
                "encryptData": encryptData,
                'iv': iv,
                'encryptedData': encryptedData
              },
              success: function (res) {
                if (res.data.status == "success") {
                  //把token放入缓存
                  console.log(res.data.data.token)
                  wx.setStorageSync('token',res.data.data.token);
                  let num=wx.getStorageSync('orderInfoId')
                  if(!num){
                    wx.switchTab({
                      url: '../myOrder/myOrder',
                    })
                  }else{
                    wx.redirectTo({
                      url: '../payOrder/payOrder?version_id='+num,
                    })
                  }
                  console.log('登陆成功');
                } else {
                  console.log('登陆失败');
                }
                typeof func == "function" && func(res.data);
              }
            });
            // wx.getStorage({
            //   key: 'token',
            //   success(res) {
            //     console.log(res)
            //   }
            // })
          }
        });

      }
    })
  },
  globalData: {
    userInfo: null,
    code:'',
    encryptedData:'',
    rawData:'',
    signature:'',
    iv:'',
    token:'',
    Api:'https://efix.ewiyi.com/api'
  }
})