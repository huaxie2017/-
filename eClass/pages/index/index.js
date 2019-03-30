//index.js
//获取应用实例
const app = getApp()
import {
  API,
  REQUEST
} from '../../utils/index.js'
let url = app.globalData.Api + "/rdata/getHigh"
let url1 = app.globalData.Api + "/rdata/getMessageList"
const methods = {
  getHigh() {
    // wx.showLoading({
    //   title: '加载中'
    // })
    let that = this
    REQUEST.get(url)
      .then((res) => {
        const {
          status,
          data
        } = res.data
        if (status === 'success') {
          that.setData({
            onlineH: data,
          })
          //  wx.hideLoading()
        } else {
          //  wx.hideLoading()
        }
      })
  },
  getMessage() {
    // wx.showLoading({
    //   title: '加载中'
    // })
    let that = this
    REQUEST.get(url1)
      .then((res) => {
        const {
          status,
          data
        } = res.data
        if (status === 'success') {
          that.setData({
            messageList: data,
          })
          // wx.hideLoading()
        } else {
          // wx.hideLoading()
        }
      })
  }
}
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: {},
    banner: '../../images/banner.jpg',
    search: '../../images/search.png',
    phoneImg: '../../images/phone.png',
    downImg: '../../images/down_icon.png',
    recycle_phone: '../../images/phone_check.png',
    recycle_pad: '../../images/pad_check.png',
    phoneOne: '../../images/phoneOne.png',
    numBg: "../../images/left_top.jpg",
    messageIcon: '../../images/messageIcon.png',
    peopleImg: '../../images/avaer.png',
    commentList: [],
    phoneList: [],
    onlineH: {},
    messageList: [],
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
    marqueeDistance: 0, //滚动距离
    maxscrollheight: '', //最大高度
    liheight: '66', //一个li的高度
  },
  ...methods,
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  freeHelp: function() {
    wx.navigateTo({
      url: '../productList/productList'
    })
  },
  goList: function() {
    wx.navigateTo({
      url: '../productList/productList'
    })
  },
  salePhone() {
    wx.navigateTo({
      url: '../productList/productList?types=1'
    })
  },
  salePad() {
    wx.navigateTo({
      url: '../productList/productList?types=2'
    })
  },
  saleNow(e) {
    wx.navigateTo({
      url: '/pages/productValuation/productValuation?id=' + e.currentTarget.dataset.item.id + '&name=' + e.currentTarget.dataset.item.name
    })
  },
  salePhoneNow(e) {
    wx.navigateTo({
      url: '/pages/productValuation/productValuation?id=' + e.currentTarget.dataset.item.id + '&name=' + e.currentTarget.dataset.item.name
    })
  },
  onLoad: function() {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    this.getHigh()
    this.getMessage()
    wx.request({
      url: app.globalData.Api + '/comment/getComment',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          commentList: res.data.data
        })
      }
    })
    wx.request({
      url: app.globalData.Api + '/rdata/getHighPrice',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          phoneList: res.data.data
        })
      }
    })
    if(!wx.getStorageSync('token')){
      app.getUserDataToken()
    }
  },
  onReady: function() {

  },
  onShow: function() {

  },
  getUserInfo: function(e) {
    wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo))
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.encryptedData = e.detail.encryptedData
    app.globalData.rawData = e.detail.rawData
    app.globalData.signature = e.detail.signature
    app.globalData.iv = e.detail.iv
    app.getUserDataToken()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})