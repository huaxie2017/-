// 上门订单 type = 1
// 已下单(1)  待上门(2)  订单完成(3) / 订单取消(4)
// 邮寄订单 type = 2
// 已下单(1)  待收件(2)  已收件(3)  订单完成(4) / 订单取消(5) 
// 到店订单 type = 3
// 已下单(1)  待到店(2) 订单完成(3) / 订单取消(4)
const app = getApp()
import { API, REQUEST } from '../../utils/index.js'
let url = app.globalData.Api + "/rdata/orderDetail"
const methods = {
  getOrderDetail(id) {
    wx.showLoading({
      title: '加载中'
    })
    let that = this
    let token = wx.getStorageSync('token')
    REQUEST.get(url, {
      data: {
        token: token,
        order_id:id
      }
    })
      .then((res) => {
        const { status, data } = res.data
        if (status === 'success') {
          that.setData({
            orderDetail: data,
            version_id: data.version_id,
            version_name: data.version_name
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
    orderId: '',
    orderType:'',
    orderDetail:{},
    version_id:'',
    version_name:'',
    popShow:true
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      orderId: options.orderId, 
    })
    this.getOrderDetail(options.orderId)
  },
  goList:function(){
    wx.redirectTo({
      url: '../productValuation/productValuation?id=' + this.data.version_id + '&name=' + this.data.version_name
    })
  },
  calling: function() {

    wx.makePhoneCall({

      phoneNumber: '0755-83259225',

      success: function() {

        console.log("拨打电话成功！")

      },

      fail: function() {

        console.log("拨打电话失败！")

      }

    })

  },
  cancelOrder(){
    wx.navigateTo({
      url: '../../pages/cancelOrder/cancelOrder?orderId=' + this.data.orderId
    })
  },
  closeFix(){
    this.setData({
      popShow:true
    })
  },
  closePop(){
    this.setData({
      popShow: true
    })
  },
  lookPop(){
    this.setData({
      popShow: false
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