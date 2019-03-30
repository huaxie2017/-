import {
  API,
  REQUEST,
  TOAST
} from '../../utils/index'
// type: 2, // type=1  上门  type=2 邮寄  type=3 门店
const editInfoRegExp = {
  telNumber: /^[1]{1}[2345678]{1}\d{9}$/,
  addressDetailInfo: /\S/,
  userName: /\S/,
  service_time: /\S/,
  province: /\S/,
  mobile_from_type: /[0 | 1 | 2 | 3 | 4]/,
  isAgreed: /[1]/
}
const editInfoTips = {
  telNumber: '请输入您的手机号码',
  addressDetailInfo: '请输入详细地址',
  userName: '请输入寄件人真实姓名',
  service_time: '请预约时间',
  province: '请选择省市区',
  mobile_from_type: '请选择机器来源',
  isAgreed: '请同意规则'
}
const methods = {
  selectType(e) { // 选择回收方式
    this.setData({
      recoverType: e.currentTarget.dataset.type,
      'formData.type': e.currentTarget.dataset.types,
      'formData.service_time': '',
     // 'formData.province': '',
      'formData.userName': '',
      'formData.additional': '',
      'formData.telNumber': '',
      'formData.addressDetailInfo': '',
    //  'formData.city': '',
    //  'formData.district': '',
      'formData.mobile_from_type': 0
    })
    //this.getLocation()
  },
  selectMail(){
    this.setData({
      recoverType: 0,
      'formData.type': 2,
      'formData.service_time': '',
      // 'formData.province': '',
      'formData.userName': '',
      'formData.additional': '',
      'formData.telNumber': '',
      'formData.addressDetailInfo': '',
      //  'formData.city': '',
      //  'formData.district': '',
      'formData.mobile_from_type': 0
    })
   // this.getLocation()
  },
  toggleRegion(e) { // 选择地址
    this.setData({
      pickShow: !this.data.pickShow,
      regions: e.detail.regions ? e.detail.regions : this.data.regions,
      'formData.province': e.detail.regions ? e.detail.regions.province.name : this.data.regions.province.name,
      'formData.city': e.detail.regions ? e.detail.regions.city.name : this.data.regions.city.name,
      'formData.district': e.detail.regions ? e.detail.regions.district.name : this.data.regions.district.name
    })
    let msg = {
      province: e.detail.regions ? e.detail.regions.province.name : this.data.regions.province.name,
      city: e.detail.regions ? e.detail.regions.city.name : this.data.regions.city.name,
      district: e.detail.regions ? e.detail.regions.district.name : this.data.regions.district.name
    }
    if (e.detail.regions) {
      this.ajaxAddress(msg)
    }
  },
  toggleDate(e) { // 选择日期
    console.log(e)
    this.setData({
      bookingShow: false
    })
    let index = this.data.dateIndex
    let oneTime = this.data.timeArr[index].value
    let formData = this.data.formData
    let typeNum = this.data.recoverType
    this.getTime(oneTime, formData, typeNum)
    // let date = `date${e.detail.recoverTypes}`
    // if (e.detail.isFixed) {
    //   this.setData({
    //     [date]: e.detail.timeStampText
    //   })
    // }
    // this.setData({
    //   recoverTypes: e.currentTarget.dataset.types || this.data.recoverTypes,
    //   dateShow: !this.data.dateShow,
    //   'formData.service_time': e.detail.timeStampText
    // })
  },
  toggleProtocol() {
    this.setData({
      protocolShow: !this.data.protocolShow
    })
  },
  togglePass() {
    this.setData({
      passShow: !this.data.passShow
    })
  },
  agree() {
    this.setData({
      'formData.isAgreed': !this.data.formData.isAgreed ? 1 : 0
    })
  },
  onInputAdditionalBlur(e) {
    this.setData({
      'formData.addressDetailInfo': e.detail.value
    })
  },
  onInputUserNameBlur(e) {
    this.setData({
      'formData.userName': e.detail.value
    })
  },
  onInputTelBlur(e) {
    this.setData({
      'formData.telNumber': e.detail.value
    })
  },
  fnVerifyForm(arr = []) {
    console.log(arr)
    for (var i = 0; i < arr.length; i++) {
      let key = arr[i]
      let item = this.data.formData[key]
      let tips = editInfoTips[key]
      if (!editInfoRegExp[key].test(item)) {
        TOAST.warning({
          title: tips
        })
        return false
      }
    }
    return true
  },
  submit() {
    let formData = this.data.formData
    if (formData.type == 2) { // 邮寄
      if (this.fnVerifyForm(['province', 'addressDetailInfo', 'userName', 'telNumber', 'service_time', 'mobile_from_type', 'isAgreed'])) {
        let params = {
          order_info_id: this.data.order_info_id,
          type: 2,
          userName: formData.userName,
          telNumber: formData.telNumber,
          service_time: formData.service_time,
          addressDetailInfo: formData.addressDetailInfo,
          province: formData.province,
          city: formData.city,
          district: formData.district,
          mobile_from_type: formData.mobile_from_type
        }
        this.saveOrder(params)
      }
    } else if (formData.type == 3) { // 门店
      if (this.fnVerifyForm(['service_time', 'userName', 'telNumber', 'isAgreed', 'mobile_from_type'])) {
        let params = {
          order_info_id: this.data.order_info_id,
          type: 3,
          service_time: formData.service_time,
          userName: formData.userName,
          telNumber: formData.telNumber,
          mobile_from_type: formData.mobile_from_type
        }
        this.saveOrder(params)
      }
    } else if (formData.type == 1) { // 上门
    console.log(this.data.formData)
      if (this.fnVerifyForm(['province', 'addressDetailInfo', 'userName', 'telNumber', 'service_time', 'mobile_from_type', 'isAgreed'])) {
        let params = {
          order_info_id: this.data.order_info_id,
          type: 1,
          userName: formData.userName,
          telNumber: formData.telNumber,
          service_time: formData.service_time,
          addressDetailInfo: formData.addressDetailInfo,
          province: formData.province,
          city: formData.city,
          district: formData.district,
          mobile_from_type: formData.mobile_from_type
        }
        this.saveOrder(params)
      }
    }
  },
  saveOrder(params) {
    let token = wx.getStorageSync('token')
    let url = API.saveOrder + '?token=' + token
    REQUEST.post(url, {
      data: params
    }).then((res) => {
      const {
        status,
        data
      } = res.data
      if (status === 'success') {
        // TUDO 跳往订单详情
        wx.navigateTo({
          url: '../order/order?orderId=' + data.order_id,
        })
      }
    })
  },
  init() {
    let that = this
    let token = wx.getStorageSync('token')
    let url = API.getInfo + '?token=' + token + '&order_info_id=' + this.data.order_info_id
    REQUEST.get(url).then((res) => {
      const {
        status,
        data
      } = res.data
      if (status === 'success') {
        let Timer = data.dateArray
        let arrT = []
        Timer.map((val, index) => {
          let str = val.time.split('-')
          let obj = {
            name: val.week,
            month: str[0],
            date: str[1],
            value: val.value,
            flag: 'normal'
          }
          arrT.push(obj)
        })
        arrT[0].flag = 'active'
        var _day = arrT[0].value
        this.setData({
          downPrice: data.downPrice,
          timeArr: arrT,
          hPrice: data.hPrice,
          price: data.price,
          day: _day
        })
      }
    })
  },
  getPrice() {
    let _self = this
    let token = wx.getStorageSync('token')
    let url = API.getPrice + '?token=' + token
    REQUEST.post(url, {
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'version_id': _self.data.id,
        'fault_id': wx.getStorageSync('ids')
      }
    }).then((res) => {
      const {
        data,
        status
      } = res.data
      if (status === 'success') {
        this.setData({
          order_info_id: data.order_info_id
        })
      }
    })
  },
  getTime(timeOne, formData, typeNum) {
    let _self = this
    let url = 'https://efix.ewiyi.com/main/ajaxVisitTime'
    let city = formData.city
    let type = ''
    if (typeNum == 0) {
      type = 'mail'
    } else if (typeNum == 1) {
      type = 'visit'
    } else {
      type = 'home'
    }
    REQUEST.get(url, {
      data: {
        date: timeOne,
        area: city,
        type: type
      }
    }).then((res) => {
      console.log(res.data)
      _self.setData({
        hourArray: res.data
      })
    })
  },
  goTransportDetail() {
    wx.navigateTo({
      url: '/pages/transportDetail/transportDetail',
    })
  },
  checkAddress(msg) {
    let _self=this
    REQUEST.get(API.checkAddress, {
      data: {
        latitude: msg.latitude,
        longitude: msg.longitude
      }
    }).then((res) => {
      const {
        status,
        data
      } = res.data
      if (status === 'success') {
        _self.setData({
          isType: data.type, //
          isHome: data.home,
          city: data.city,
          'formData.province': data.province,
          'formData.city': data.city,
          'formData.district': data.district
        })
        console.log(_self.data.formData)
        if (data.type == 0 && data.home == 0) {
          wx.showModal({
            title: '提示',
            content: '当前位置不支持门店回收及上门回收',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
          this.selectMail()
          _self.setData({
            recoverType:0
          })
        } else if (data.type == 0) {
          wx.showModal({
            title: '提示',
            content: '当前位置不支持上门回收',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        } else if (data.home == 0) {
          wx.showModal({
            title: '提示',
            content: '当前位置不支持门店回收',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }
            }
          })
        }
        console.log(res)
      }
    })
  },
  ajaxAddress(msg) {
    REQUEST.get(API.ajaxAddress, {
      data: {
        province: msg.province,
        city: msg.city,
        district: msg.district
      }
    }).then((res) => {
      const {
        status,
        data
      } = res.data
      if (status === 'success') {
        this.setData({
          isType: data.type, //
          isHome: data.home,
          city: data.city,
          'formData.province': data.province,
          'formData.city': data.city,
          'formData.district': data.district
        })
        if (data.type == 0 && data.home == 0) {
          wx.showModal({
            title: '提示',
            content: '当前位置不支持门店回收及上门回收',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }
            }
          })
          this.selectMail()
          this.setData({
            recoverType:0
          })
        } else if (data.type == 0) {
          wx.showModal({
            title: '提示',
            content: '当前位置不支持上门回收',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        } else if (data.home == 0) {
          wx.showModal({
            title: '提示',
            content: '当前位置不支持门店回收',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }

      }
      console.log(res)
    })
  },
  getLocation() {
    let _self = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        const {
          latitude,
          longitude
        } = res
        _self.checkAddress({
          latitude: latitude,
          longitude: longitude
        })
      },
    })
  },
  listenerPickerSelected(e) {
    console.log(e)
    this.setData({
      index: e.detail.value,
      'formData.mobile_from_type': e.detail.value
    })
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [{
        content: '135****7731卖出 华为 P9一台 获得￥1234'
      },
      {
        content: '135****'
      },
      {
        content: '15garhgreigh31卖出 华为 P9一台 获得￥1234'
      }
    ],
    timeArr: [{
        name: '今天',
        month: '05',
        date: '16',
        value: '',
        flag: 'active'
      },
      {
        name: '明天',
        month: '05',
        date: '17',
        value: '',
        flag: 'normal'
      },
      {
        name: '星期四',
        month: '05',
        date: '18',
        value: '',
        flag: 'normal'
      },
      {
        name: '星期五',
        month: '05',
        date: '19',
        value: '',
        flag: 'normal'
      },
      {
        name: '星期六',
        month: '05',
        date: '20',
        value: '',
        flag: 'normal'
      },
      {
        name: '星期日',
        month: '05',
        date: '21',
        value: '',
        flag: 'normal'
      },
      {
        name: '星期一',
        month: '05',
        date: '22',
        value: '',
        flag: 'normal'
      },
    ],
    dataline: ['10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'],
    hourArray: [1, 0, 0, 0, 0],
    full: ['normal', 'normal', 'normal', 'normal', 'normal'],
    cho: ['normal', 'normal', 'normal', 'normal', 'normal'],
    datetime: '',
    day: '',
    dateIndex: 0,
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
    passShow: false,
    bookingShow: true,
    protocolContent: null, // 用户协议相关
    date0: '',
    date1: '',
    date2: '',
    recoverTypes: 0,
    isType: 1, // 是否支持上门
    isHome: 1, // 是否支持到店
    city: null,
    order_info_id: null,
    formData: {
      type: 2, // type=1  上门  type=2 邮寄  type=3 门店
      userName: '',
      additional: '',
      telNumber: '',
      service_time: '',
      addressDetailInfo: '',
      province: '',
      city: '',
      district: '',
      mobile_from_type: null,
      isAgreed: 0
    },
    orginList: [
      '自购',
      '他人赠送',
      '活动获得',
      '其他'
    ]
  },
  ...methods,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      order_info_id: options.version_id,
    })
    this.getLocation()
    this.init()
    // this.getPrice()
  },
  bookingTime: function() {
    var that = this
    that.setData({
      bookingShow: false
    })
  },
  bookingHide: function() {
    this.setData({
      bookingShow: true
    })
  },
  toMember(){
    wx.navigateTo({
      url: '../memberKnow/memberKnow',
    })
  },
  toPassMember(){
    wx.navigateTo({
      url: '../memberHide/memberHide',
    })
  },
  chooseDate: function(e) {
    console.log(e)
    var that = this
    var _index = e.currentTarget.dataset.hour
    var _day = e.currentTarget.dataset.input
    var timeA = that.data.timeArr
    var choosed = that.data.cho
    for (var i = 0; i < choosed.length; i++) {
      choosed[i] = 'normal'
    }
    for (var i = 0; i < timeA.length; i++) {
      timeA[i].flag = 'normal'
    }
    timeA[_index].flag = 'active'
    var fd = that.data.full
    for (var i = 0; i < fd.length; i++) {
      fd[i] = 'normal'
    }
    that.setData({
      timeArr: timeA,
      full: fd,
      cho: choosed,
      day: _day,
      dateIndex:_index
    })
    let oneTime = this.data.timeArr[_index].value
    let formData = this.data.formData
    let typeNum = this.data.recoverType
    this.getTime(oneTime, formData, typeNum)
    // if (_index == 0) {
    //   util.fulldate(that)
    // }
  },
  chooseTime: function(e) {
    var that = this
    console.log(e)
    var _index = e.currentTarget.dataset.t
    var status = e.currentTarget.dataset.status
    var choosed = that.data.cho
    var fd = that.data.full
    if (status == 0) {
      if (fd[_index] == 'full-date') {
        return;
      }
      for (var i = 0; i < choosed.length; i++) {
        choosed[i] = 'normal'
      }
      choosed[_index] = 'choiced'
      var dateD = that.data.day
      var dateT = e.currentTarget.dataset.l
      var time = dateD + '' + dateT
      var timeStrArr = dateT.split('-')
      var postTime = dateD + " "+timeStrArr[0]+":00"
      var postTimeShow=dateD+" "+dateT
      that.setData({
        cho: choosed,
        bookingShow: true,
        datetime: postTimeShow,
        'formData.service_time': postTime
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.removeStorageSync('orderInfoId')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log(this.data.timeArr)
    // let oneTime= this.data.timeArr[0].value
    // console.log(oneTime)
    // let formData = this.data.formData
    // let typeNum=this.data.recoverType
    // this.getTime(oneTime, formData, typeNum)
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