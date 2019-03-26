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
    REQUEST.get(url, {
        data: {
          token: app.globalData.token
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
    orderList:[],
    noOrder:false
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   this.getOrderList()
  },
  linkTo(e) {
    wx.navigateTo({
      url: "../order/order?orderId=" + e.currentTarget.dataset.orderid + "&orderStatus=" + e.currentTarget.dataset.status
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