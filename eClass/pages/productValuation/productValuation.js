import { API, REQUEST, TOAST } from '../../utils/index.js'
const methods = {
  init () { 
    let url = API.getDetail + '?version_id=' + this.data.id
    REQUEST.get(url).then((res) => {
      const { status, data } = res.data
      if (status === 'success') {
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
        console.log(questionModule[i])
        num = num + 1
      }
    }
    this.setData({
      hasSelectedNum: num,
      progressWidth: 322 + (750 - 322) * num / this.data.questionModule.length
    })
  },
  fnVerifyForm () { // 校验是否全选
    for (let i = 0; i < this.data.questionModule.length; i++) {
      if (!this.data.questionModule[i].selected && !this.data.questionModule.selectId) {
        TOAST.warning({ title: `你还没有选中${this.data.questionModule[i].name}哦` });
        return false
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
      // core code
    }
  }
}
Page({
  data: {
    id: null,
    name: null,
    questionModule: null,
    questionNum: null,
    progressWidth: 322,
    tipsShow: false
  },  
  ...methods,
  onLoad: function (options) {
    this.setData({
      id: options.id || 4113,
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