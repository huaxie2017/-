// pages/productList/productList.js
import { API, REQUEST } from '../../utils/index.js'
console.log(API)
const app = getApp()
const methods = {
  selectType (e) { // 选择手机/平板类型
    if (e.currentTarget.dataset.selected) return
    let _self = this
    let selecteModule = _self.data.selecteModule
    selecteModule.forEach((item) => {
      if (item.ids === e.currentTarget.dataset.index) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
    _self.setData({
      selecteModule: selecteModule
    })
  },
  initBrand () {
    REQUEST.get(API.getBrand).then((res) => {
      const { status, data } = res.data
      if (status === 'success') {
        this.setData({
          brandModule: data,
          'brand_id': data[0].id
        }, () => {
          this.chooseBrand(data[0].id)
        })
      }
    })
  },
  chooseBrand (e) {
    wx.showLoading({
      title: '加载中'
    })
    let that = this
    REQUEST.get(API.getVersionById, {
      data: {
        'brand_id': e == that.data.brandModule[0].id ?  that.data.brandModule[0].id : e.currentTarget.dataset.id
      }
    }).then((res) => {
      const { status, data } = res.data
      if (status === 'success') {
        this.setData({
          versionModule: data,
          'brand_id': e == that.data.brandModule[0].id ? that.data.brandModule[0].id : e.currentTarget.dataset.id,
          scrollTop: 0
        })
        wx.hideLoading()
      } else {
        wx.hideLoading()
      }
    })
  },
  goValuation (e) { // tiao
    wx.navigateTo({
      url: '/pages/productValuation/productValuation?id=' + e.currentTarget.dataset.item.id + '&name=' + e.currentTarget.dataset.item.name
    })
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selecteModule: [ 
      {
        content: '卖手机',
        selected: true,
        ids: 0
      },
      {
        content: '卖平板',
        selected: false,
        ids: 1
      }
    ],
    brandModule: [],
    versionModule: [],
    scrollTop: 0
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBrand()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})