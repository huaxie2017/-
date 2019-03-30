//获取应用实例
const app = getApp()
import {API,REQUEST} from '../../utils/index.js'
let url = app.globalData.Api + "/rdata/orderList"
const methods = {
  getOrderList() {
    wx.showLoading({
      title: '加载中'
    })
    let that = this
    let token = wx.getStorageSync('token')
    REQUEST.get(url, {
        data: {
          token: token
        }
      })
      .then((res) => {
        const {status,data} = res.data
        if (status === 'success') {
          let status=false
          if(data.length==0){
            status = true
          }else{
            status = false
          }
          that.setData({
            orderList: data,
            noOrder: status
          })
          wx.hideLoading()
        } else {
          that.setData({
            noOrder:true
          })
          wx.hideLoading()
        }
      })
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: app.globalData.hasUserInfo,
    userInfo:null,
    orderList:[],
    noOrder:false
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    if(!this.data.hasUserInfo){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    this.getOrderList()
  },
  linkTo(e) {
    wx.navigateTo({
      url: "../order/order?orderId=" + e.currentTarget.dataset.orderid
    })
  },
  ToComment(e) {
    wx.navigateTo({
      url: "../comment/comment?orderId=" + e.currentTarget.dataset.orderid 
    })
  },
  cancelOrder(e) {
    console.log(e)
    var orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../../pages/cancelOrder/cancelOrder?orderId=' + orderId
    })
  },
  getUserInfo: function (e) {
    wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo))
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.encryptedData = e.detail.encryptedData
    app.globalData.rawData = e.detail.rawData
    app.globalData.signature = e.detail.signature
    app.globalData.iv = e.detail.iv
    app.globalData.hasUserInfo=true
    app.getUserDataToken()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})