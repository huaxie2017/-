Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    reasonList: [{
        status: 0,
        reason: '交易时间不对'
      },
      {
        status: 0,
        reason: '其他原因'
      },
      {
        status: 0,
        reason: '自己留用'
      },
      {
        status: 0,
        reason: '价格不符合预期'
      },
      {
        status: 0,
        reason: '下单错误'
      },
    ],
    chooseIndex:null,
    cancelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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