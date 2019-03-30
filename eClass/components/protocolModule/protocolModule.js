// components/agreeModule/agreeModu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{
        type:String,
        value:''
      },
      type:{
        type: Number,
        value:1 
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close () {
      this.triggerEvent('toggleProtocol', {})
      this.triggerEvent('togglePass', {})
    }
  }
})
