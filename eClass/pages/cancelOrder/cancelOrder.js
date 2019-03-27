const app = getApp()
import { API, REQUEST } from '../../utils/index.js'
let url = app.globalData.Api + "/rdata/getCancel"
let url1 = app.globalData.Api + "/rdata/cancelOrder"
const methods = {
  getDetail() {
    wx.showLoading({
      title: '加载中'
    })
    let that = this
    REQUEST.get(url)
      .then((res) => {
        const { status, data } = res.data
        if (status === 'success') {
          that.setData({
            reasonList: data,
          })
          wx.hideLoading()
        } else {
          wx.hideLoading()
        }
      })
  },
  cancelOrder(id,index){
    wx.showLoading({
      title: '加载中'
    })
    let that = this
    REQUEST.get(url1,{
      data:{
        token:app.globalData.token,
        order_id:id,
        remark:index
      }
    })
      .then((res) => {
        const { status, data } = res.data
        if (status === 'success') {
          that.setData({
           // reasonList: data,
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
    orderId:'',
    reasonList: [],
    chooseIndex:null,
    cancelShow:false
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDetail()
    this.setData({
      orderId: options.orderId
    })
  },
  chooseReason(e){
    var that=this
    var index = e.currentTarget.dataset.index
    this.setData({
      chooseIndex:index
    })
  },
  cancelClick(){
    if (this.data.chooseIndex==null){
      wx.showModal({
        title: '提示',
        content: '请选择取消原因',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }else{
      this.setData({
        cancelShow:true
      })
    }
  },
  thinkAbout(){
    this.setData({
      cancelShow: false
    })
  },
  sure(e){
    this.setData({
      cancelShow: false
    })
    this.cancelOrder(this.data.orderId, this.data.chooseIndex)
    wx.navigateTo({
      url: "../order/order?orderId=" + this.data.orderId +"&orderStatus=4"
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