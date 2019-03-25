import ENV from './env.js'
const api = {
  getBrand: 'rdata/getBrand', // 获取品牌列表
  getVersionById: 'rdata/getVersion', // 获取型号列表
  getDetail: 'rdata/getDetail'
}
for (let i in api) {
  api[i] = ENV + api[i]
}
export default api