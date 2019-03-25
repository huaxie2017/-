const ENV = {
  dev: 'https://efix.ewiyi.com/api/',
  test: 'https://efix.ewiyi.com/api/',
  pros: 'https://efix.ewiyi.com/api/'
}
function getOrigin () {
  try {
    var systemInfo = wx.getSystemInfoSync()
    const platform = systemInfo.platform === 'devtools' ? ENV.dev : ENV.prod
    return platform
  } catch (e) {
    return ENV.prod
  }
}

export default getOrigin()