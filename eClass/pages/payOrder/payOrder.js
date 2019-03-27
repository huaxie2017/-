import { API, REQUEST, TOAST } from '../../utils/index'
const methods = {
  selectType (e) { // 选择回收方式
    this.setData({
      recoverType: e.currentTarget.dataset.type
    })
  },
  toggleRegion (e) { // 选择地址
    console.log(e.currentTarget.dataset.isClose)
    this.setData({
      pickShow: !this.data.pickShow,
      regions: e.detail.regions ? e.detail.regions : this.data.regions
    })
  },
  toggleDate (e) { // 选择日期
    let date = `date${e.detail.recoverTypes}`
    console.log(e)
    if (e.detail.isFixed) {
      this.setData({
        [date]: e.detail.timeStampText
      })
    }
    this.setData({
      recoverTypes: e.currentTarget.dataset.types || this.data.recoverTypes,
      dateShow: !this.data.dateShow
    })
  },
  toggleProtocol () {
    this.setData({
      protocolShow: !this.data.protocolShow
    })
  },
  agree () {
    this.setData({
      isAgreed: !this.data.isAgreed
    })
  },
  submit () {
    if (!this.data.isAgreed) TOAST.warning({title: '请同意规则！'}); return
  },
  init () {
    let url = API.getInfo + '?token=6542bdbb9c47d8109fcaa4d95c9a19d3' + '&order_info_id=' + 13701
    REQUEST.get(url).then((res) => {
    })
  },
  getPrice () {
    let url = API.getPrice + '?token=' + '6542bdbb9c47d8109fcaa4d95c9a19d3'
    REQUEST.post(API.getPrice, {
      data: {
        version_id: this.data.id,
        fault_id: wx.getStorageSync('ids')
      }
    }).then((res) => {
      const { data, status } = res.data
      if (status === 'success') {
      }
    })
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [
      {
        content: '135****7731卖出 华为 P9一台 获得￥1234'
      },
      {
        content: '135****'
      },
      {
        content: '15garhgreigh31卖出 华为 P9一台 获得￥1234'
      }
    ],
    indicatorDots: false,
    // autoplay: true,
    interval: 5000,
    duration: 1000,
    vertical: true,
    circular: true,
    recoverType: 0,
    regions: {
      province: {
        name: "广东省",
        id: 0
      },
      city: {
        name: '深圳市',
        id: 0
      },
      district: {
        name: "南山区",
        id: 0
      }
    },
    pickShow: false,
    dateShow: false,
    protocolShow: false,
    protocolContent: null, // 用户协议相关
    date0: '',
    date1: '',
    date2: '',
    recoverTypes: 0,
    isAgreed: false
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    // this.init()
    // this.getPrice()
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