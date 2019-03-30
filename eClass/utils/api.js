import ENV from './env.js'
const api = {
  getBrand: 'rdata/getBrand', // 获取品牌列表
  getBrandP: 'rdata/getBrandP',
  getVersionById: 'rdata/getVersion', // 获取型号列表
  getDetail: 'rdata/getDetail',
  getInfo: 'rdata/info',
  getPrice: 'rdata/ajaxInfo',
  checkAddress: 'rdata/checkAddress', // 校验地址是否可上门/门店回收
  saveOrder: 'rdata/submit', // 提交订单
  ajaxAddress:'rdata/ajaxAddress'
}
for (var i in api) {
  api[i] = ENV + api[i]
}
export default api