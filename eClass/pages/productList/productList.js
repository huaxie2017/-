// pages/productList/productList.js
import { API, REQUEST, LOADING } from '../../utils/index.js'
console.log(API)
const app = getApp()
const methods = {
  selectType (e) { // 选择手机/平板类型
    if (e.currentTarget.dataset.selected) return
    let _self = this
    let selecteModule = _self.data.selecteModule
    if (e.currentTarget.dataset.types == 2) { // 卖平板
      this.initBrandP()
    } else {
      this.initBrand()
    }
    selecteModule.forEach((item) => {
      if (item.idx === e.currentTarget.dataset.types) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
    console.log(_self.data.brand_id)
    _self.setData({
      selecteModule: selecteModule,
      types: e.currentTarget.dataset.types
    }, () => {
      this.chooseBrand({
        'brandId': _self.data.brand_id
      })
    })
  },
  indexChoose(types){
    let _self = this
    let selecteModule = _self.data.selecteModule
    if (types == 2) { // 卖平板
      this.initBrandP()
    } else {
      this.initBrand()
    }
    selecteModule.forEach((item) => {
      if (item.idx == types) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
    _self.setData({
      selecteModule: selecteModule,
      types:types
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
          this.chooseBrand({
            'brandId': data[0].id
          })
        })
      }
    })
  },
  initBrandP() {
    REQUEST.get(API.getBrandP).then((res) => {
      const { status, data } = res.data
      if (status === 'success') {
        this.setData({
          brandModule: data,
          'brand_id': data[0].id
        }, () => {
          this.chooseBrand({
            'brandId': data[0].id
          })
        })
      }
    })
  },
  selectBrand (e) {
    this.chooseBrand({
      'brandId': e.currentTarget.dataset.id
    })
  },
  chooseBrand (msg) {
    console.log(msg)
    LOADING.show({title: '加载中'})
    let that = this
    REQUEST.get(API.getVersionById, {
      data: {
        'brand_id': msg.brandId,
        'type': that.data.types
      }
    }).then((res) => {
      const { status, data } = res.data
      if (status === 'success') {
        this.setData({
          versionModule: data,
          'brand_id': msg.brandId,
          scrollTop: 0
        })
        LOADING.hide()
      } else {
        LOADING.hide()
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
        idx: 1
      },
      {
        content: '卖平板',
        selected: false,
        idx: 2
      }
    ],
    brandModule: [],
    versionModule: [],
    scrollTop: 0,
    types: 1
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.types){
      this.indexChoose(options.types)
    }else{
      this.initBrand()
    }
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