//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: {},
    banner:'../../images/banner.jpg',
    search:'../../images/search.png',
    phoneImg:'../../images/phone.png',
    downImg:'../../images/down_icon.png',
    recycle_phone:'../../images/phone_check.png',
    recycle_pad:'../../images/pad_check.png',
    phoneOne:'../../images/phoneOne.png',
    numBg:"../../images/left_top.jpg",
    messageIcon:'../../images/messageIcon.png',
    peopleImg:'../../images/avaer.png',
    commentList:[],
    phoneList:[],
    swiper: {
      indicatorDots: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
     // indicatorColor: "rgba(0,0,0,0.6)",
      //indicatorActive: "#fff",
      circular: true,
     // imgUrl: ["../../image/banner.jpg", "../../image/banner.jpg"]
    },
    marqueeDistance: 0,//滚动距离
    maxscrollheight: '',//最大高度
    liheight: '66',//一个li的高度
    winnersbox:[
      { text:'深圳林先生 IPhone X 成功回收 进账￥3899'},
      { text: '深圳林先生 IPhone X 成功回收 进账￥3899' },
      { text: '深圳林先生 IPhone X 成功回收 进账￥3899' },
      { text: '深圳林先生 IPhone X 成功回收 进账￥3899' },
      { text: '深圳林先生 IPhone X 成功回收 进账￥3899' }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  freeHelp: function () {
    wx.switchTab({
      url: '../productList/productList'
    })
  },
  goList: function () {
    wx.switchTab({
      url: '../productList/productList'
    })
  },
  salePhone(){
    wx.switchTab({
      url: '../productList/productList?index=0'
    })
  },
  salePad() {
    wx.switchTab({
      url: '../productList/productList?index=1'
    })
  },
  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: app.globalData.Api +'/comment/getComment',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          commentList:res.data.data
        })
      }
    })
    wx.request({
      url: app.globalData.Api + '/rdata/getHighPrice',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          phoneList: res.data.data
        })
      }
    })
  },
  onShow: function () {
    wx.login({
      success: res => {
        if (res.code) {
          app.globalData.code = res.code
          wx.request({
            url: 'https://efix.ewiyi.com/api/default/wxProgramLogin',
            data: {
              code: app.globalData.code,
              rawData: app.globalData.rawData,
              encryptedData: app.globalData.encryptedData,
              signature: app.globalData.signature,
              iv: app.globalData.iv
            },
            success: function (res) {
              wx.setStorageSync('token', res.data.data.token)
              app.globalData.token = res.data.data.token
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.encryptedData = e.detail.encryptedData
    app.globalData.rawData = e.detail.rawData
    app.globalData.signature = e.detail.signature
    app.globalData.iv = e.detail.iv
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
