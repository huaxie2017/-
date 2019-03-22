Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    comment:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.orderId
    })
  },
  inputContent(e){
    this.setData({
      comment: e.detail.value
    })
  },
  save(){
   var content=this.data.comment
   if(content.length==0){
     wx.showModal({
       title: '提示',
       content: '评论不能为空',
       showCancel:false,
       success: function (res) {
         if (res.confirm) {
           console.log('用户点击确定')
         } else {
           console.log('用户点击取消')
         }

       }
     })
   }
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