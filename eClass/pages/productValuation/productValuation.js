const app = getApp()
import { API, REQUEST, TOAST } from '../../utils/index.js'
let ids = []
const methods = {
  init () { 
    wx.showLoading({
      title: '加载中',
    })
    let url = API.getDetail + '?version_id=' + this.data.id
    REQUEST.get(url).then((res) => {
      const { status, data } = res.data
      if (status === 'success') {
        wx.hideLoading()
        let arr = []
        for (let [key, val] of Object.entries(data)) {
          let item = {
            name: key,
            detail: data[key],
            selected: false,
            selectId: null
          }
          arr.push(item)
        }
        this.setData({
          questionModule: arr,
          questionNum: arr.length,
          hasSelectedNum: 0
        })
      }
    })
  },
  send(params,type){
    let token=wx.getStorageSync('token')
    let url = API.getPrice + "?token=" + token
    REQUEST.post(url, { data: params}).then((res) => {
      const { status, data } = res.data
      if (status === 'success') {
        console.log(res)
        wx.setStorageSync('orderInfoId', data.order_info_id)
        if(type==1){
          wx.navigateTo({
            url: '/pages/payOrder/payOrder?version_id=' + data.order_info_id
          })
        }else{
          wx.navigateTo({
            url: '../login/login',
          })
        } 
      }
    })
  },
  chooseSize (e) { // 回答问题
    let questionModule = this.data.questionModule
    let r = 'questionModule[' +  e.currentTarget.dataset.idx + '].selected'
    let id = 'questionModule[' + e.currentTarget.dataset.idx + '].selectId'
    this.setData({
      [r]: this.data.questionModule[e.currentTarget.dataset.idx].selectId === e.currentTarget.dataset.id ? false : true,
      [id]: this.data.questionModule[e.currentTarget.dataset.idx].selectId === e.currentTarget.dataset.id ? null : e.currentTarget.dataset.id,
    })
    let num = 0
    for (let i = 0; i < questionModule.length; i++) {
      if (questionModule[i].selected) {
        num = num + 1
      }
    }
    this.setData({
      hasSelectedNum: num,
      progressWidth: 100 + (750 - 100) * num / this.data.questionModule.length
    })
  },
  fnVerifyForm () { // 校验是否全选
    for (let i = 0; i < this.data.questionModule.length; i++) {
      if (!this.data.questionModule[i].selected && !this.data.questionModule.selectId) {
        TOAST.warning({ title: `你还没有选中${this.data.questionModule[i].name}哦` });
        return false
      } else {
        ids.push(this.data.questionModule[i].selectId)
      }
    }
    return true
  },
  toggleTips () { // 展示提示Modal
    this.setData({
      tipsShow: !this.data.tipsShow
    })
  },
  submit () {
    if (this.fnVerifyForm()) {
      let idArr = ids.join(',')
      let version_id = this.data.id
      let params={
        version_id: version_id,
        fault_id: idArr
      }
    // wx.setStorageSync('ids', ids.join(','))
    if(!wx.getStorageSync('token')){
      this.send(params,0)
    }else{
      this.send(params,1)
    }
    }
  }
}
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: {},
    id: null,
    name: null,
    questionModule: null,
    questionNum: null,
    progressWidth: 100,
    tipsShow: false
  },  
  ...methods,
  onLoad: function (options) {
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
    this.setData({
      id: options.id,
      name: options.name,
      windowWidth: wx.getSystemInfoSync().windowWidth
    }, () => {
      wx.setNavigationBarTitle({title: options.name})
      this.init()
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})