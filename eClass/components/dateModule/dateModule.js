// components/timeModule/timeModule.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recoverTypes: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dates: [
      '2019-03-16',
      '2019-03-15',
      '2019-03-14',
      '2019-03-13',
      '2019-03-12',
      '2019-03-11'
    ],
    times: [
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00'
    ],
    timeChange: [],
    timeStampText: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleDate () {
      this.triggerEvent('toggleDate', {
        isFixed: false
      })
    },
    bindChange (e) {
      console.log(e)
      this.setData({
        timeChange: e.detail.value
      }, () => {
        console.log(this.data.timeChange)
      })
    },
    submit () {
      console.log(this.data)
      this.setData({
        timeStampText: this.data.dates[this.data.timeChange[0]] + '-' + this.data.times[this.data.timeChange[1]]
      })
      this.triggerEvent('toggleDate', {
        recoverTypes: this.data.recoverTypes,
        timeStampText: this.data.dates[this.data.timeChange[0]] + ' ' + this.data.times[this.data.timeChange[1]],
        isFixed: true
      })
    }
  }
})
