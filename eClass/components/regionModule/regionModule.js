import {
  REQUEST,
  API,
  TOAST,
  UTIL
} from '../../utils/index'
let index = [0, 0, 0]
const normalRegion = require('../../utils/normalRegion.js')
let regionInfo = {
  province: {
    id: null,
    label: '省',
    index: null
  },
  city: {
    id: null,
    label: '',
    index: null
  },
  district: {
    id: null,
    label: '',
    index: null
  }
}
const app = getApp()
const editInfoRegExp = {
  receiverName: /^.{1,6}$/,
  receiverPhone: /^[1]{1}[2345678]{1}\d{9}$/,
  region: /^\S+$/,
  additional: /^.{1, 30}$/
}
const addressDef = '街道、门牌号、小区等详细地址'
const data = {
  region: [],
  customItem: '',
  addressInfo: {},
  pickShow: false,
  orderTips: {
    receiverName: '请填写收货人',
    receiverPhone: '请填写手机号',
    region: '请选择省市区',
    additional: '请填写详细地址'
  },
  editModule: {
    receiverName: '',
    receiverPhone: '',
    additional: ''
  },
  addressDef: addressDef,
  addressAbled: false,
  regionInfo: {
    province: {
      label: '省',
      id: null,
      index: null
    },
    city: {
      label: '',
      id: null,
      index: null
    },
    district: {
      label: '',
      id: null,
      index: null
    }
  },
  regionIdShow: {
    provinceId: null,
    cityId: null,
    districtId: null
  },
  regionLabel: {
    province: '省',
    city: '',
    district: ''
  },
  regionModule: {
    provinceModule: [],
    cityModule: [],
    districtModule: []
  },
  selectType: 0, //默认选择省 0-省, 1-市, 2-区县
  edit: 0,
  scrollTop: 0
}
const methods = {
  fnVerifyForm(fieldList = []) {
    let _self = this
    for (let i = 0; i < fieldList.length; i++) {
      let item = fieldList[i]
      let val = _self.data.editModule[item]
      let tips = _self.data.orderTips[item]
      console.log(item)
      console.log(editInfoRegExp[item].test(val))
      if (!editInfoRegExp[item].test(val)) {
        TOAST.success({
          title: tips
        })
        return false
      }
    }
    return true
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let val = e.detail.value.join(' ')
    this.setData({
      region: val
    })
  },
  selectAdress() { // 选择省市区
    console.log(normalRegion)
    if (!this.data.editModule.additional) {
      this.setData({
        addressDef: ''
      })
    }
    this.setData({
      pickShow: true,
      addressAbled: true,
      selectType: 0,
      'regionLabel.province': '省',
      'regionLabel.city': '',
      'regionLabel.district': '',
      scrollTop: 0
    })
    if (!this.data.edit) {
      if (this.data.regionInfo.city.id) {
        this.initCitys()
      }
      if (this.data.regionInfo.district.id) {
        this.initDistricts()
      }
    } else {

    }
  },
  switchLabel(e) { // 新版联动选择器 0-省, 1-市, 2-区县
    this.setData({
      selectType: e.currentTarget.dataset.type,
      scrollTop: 0
    })
  },
  initProvince() {
    let provinces = []
    let region = normalRegion.regions
    console.log(region)
    for (let i = 0; i < region.length; i++) {
      let item = {
        name: region[i].name,
        id: region[i].id
      }
      provinces.push(item)
    }
    console.log(provinces)
    if (provinces.length != 0) {
      this.setData({
        'regionModule.provinceModule': provinces,
        selectType: 0
      })
    }
  },
  selectProvince(e) {
    this.setData({})
    let region = normalRegion.regions
    let child = region[e.currentTarget.dataset.index].child
    let citys = []
    for (let i = 0; i < child.length; i++) {
      let item = {
        name: child[i].name,
        id: child[i].id
      }
      citys.push(item)
    }
    if (citys.length > 0) {
      regionInfo = {
        province: {
          id: e.currentTarget.dataset.id,
          label: e.currentTarget.dataset.label,
          index: e.currentTarget.dataset.index
        },
        city: {
          id: null,
          label: '市',
          index: null
        },
        district: {
          id: null,
          label: '',
          index: null
        }
      }
      this.setData({
        'regionModule.cityModule': citys,
        selectType: 1,
        'regionLabel.province': e.currentTarget.dataset.label,
        'regionIdShow.provinceId': e.currentTarget.dataset.id,
        'regionLabel.city': '市',
        'regionIdShow.cityId': null,
        'regionIdShow.districtId': null,
        'regionLabel.district': '',
        scrollTop: 0
      })
    }
  },
  selectCity(e) {
    this.setData({})
    let region = normalRegion.regions
    let index = regionInfo.province.index
    let subIndex = e.currentTarget.dataset.index
    let district = region[index].child[subIndex].child
    let districts = []
    for (let i = 0; i < district.length; i++) {
      let item = {
        name: district[i].name,
        id: district[i].id
      }
      districts.push(item)
    }
    if (districts.length > 0) {
      regionInfo.city.id = e.currentTarget.dataset.id
      regionInfo.city.label = e.currentTarget.dataset.label
      regionInfo.city.index = e.currentTarget.dataset.index
      regionInfo.district.id = null
      regionInfo.district.label = '区县'
      regionInfo.district.index = null
      this.setData({
        'regionModule.districtModule': districts,
        selectType: 2,
        'regionLabel.city': e.currentTarget.dataset.label,
        'regionIdShow.cityId': e.currentTarget.dataset.id,
        'regionLabel.district': '区县',
        'regionIdShow.districtId': null,
        scrollTop: 0
      })
    }
  },
  selectDistrict(e) {
    this.setData({
      scrollTop: 0
    })
    regionInfo.district.id = e.currentTarget.dataset.id
    regionInfo.district.label = e.currentTarget.dataset.label
    regionInfo.district.index = e.currentTarget.dataset.index
    this.setData({
      'regionIdShow.districtId': e.currentTarget.dataset.id,
      'regionLabel.district': e.currentTarget.dataset.label
    })
    this.defineLocation()
  },
  initCitys() {
    let region = normalRegion
    let index = regionInfo.province.index
    let child = region[index].child
    let citys = []
    for (let i = 0; i < child.length; i++) {
      let item = {
        name: child[i].name,
        id: child[i].id
      }
      citys.push(item)
    }
    if (citys.length > 0) {
      this.setData({
        'regionModule.cityModule': citys
      })
    }
  },
  initDistricts() {
    let region = normalRegion
    let index = regionInfo.province.index
    let subIndex = regionInfo.city.index
    let district = region[index].child[subIndex].child
    let districts = []
    for (let i = 0; i < district.length; i++) {
      let item = {
        name: district[i].name,
        id: district[i].id
      }
      districts.push(item)
    }
    if (districts.length > 0) {
      this.setData({
        'regionModule.districtModule': districts
      })
    }
  },
  defineLocation() {
    this.triggerEvent('toggleRegion', {
      regions: {
        province: {
          name: regionInfo.province.label,
          id: this.data.regionIdShow.provinceId
        },
        city: {
          name: regionInfo.city.label,
          id: this.data.regionIdShow.cityId
        },
        district: {
          name: regionInfo.district.label,
          id: this.data.regionIdShow.districtId
        }
      },
      isClose: false
    })
  },
  toggleRegion () {
    this.triggerEvent('toggleRegion', {
      isClose: true
    })
  }
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    editModule: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        console.log(newVal)
        if (newVal && newVal.province) {
          console.log(newVal)
          let regionInfo1 = {
            province: {
              id: newVal.province.id,
              label: newVal.province.name,
              index: null
            },
            city: {
              id: newVal.city.id,
              label: newVal.city.name,
              index: null
            },
            district: {
              id: newVal.district.id,
              label: newVal.district.name,
              index: null
            }
          }
          regionInfo = regionInfo1
          this.setData({
            regionInfo: regionInfo1,
            edit: 1
          })
        }
      }
    },
    region: {
      type: Object
    }
  },
  data,
  methods,
  ready() {
    this.initProvince()
    console.log(this.data)
  }
})
