const normalRegion = require('../../utils/normalRegion.js')
let index = [0, 0, 0]
let province = {
  regionName: '北京',
  id: 110000
}
let city = {
  regionName: '北京市',
  id: 110100
}
let county = {
  regionName: '东城区',
  id: 110101
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    provinces: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initProvince() {
      let provinces = []
      let citys = []
      let countys = []
      console.log(normalRegion)
      let region = normalRegion.region
      console.log(region)
      for (let i = 0; i < region.length; i++) {
        let item = {
          regionName: region[i].regionName,
          id: region[i].id
        }
        provinces.push(item)
        for (let j = 0; j < region[i].subRegions.length; j++) {
          let item = {
            regionName: region[i].subRegions[j].regionName,
            id: region[i].subRegions[j].id
          }
          citys.push(item)
          for (let m = 0; m < region[i].subRegions[j].subRegions.length; m++) {
            let item = {
              regionName: region[i].subRegions[j].subRegions[m].regionName,
              id: region[i].subRegions[j].subRegions[m].id
            }
            countys.push(item)
          }
        }
      }
      if (provinces && citys) {
        this.setData({
          provinces: provinces,
          citys: citys,
          countys: countys
        })
      }
    },
    initCitys(index) {
      let region = normalRegion.region
      let subRegions = region[index].subRegions
      let citys = []
      for (let i = 0; i < subRegions.length; i++) {
        let item = {
          regionName: subRegions[i].regionName,
          id: subRegions[i].id
        }
        citys.push(item)
      }
      if (citys.length > 0) {
        this.setData({
          citys: citys
        })
      }
    },
    initCountys(index, subIndex) {
      console.log(subIndex)
      let region = normalRegion.region
      console.log(region[index].subRegions[subIndex])
      let county = region[index].subRegions[subIndex].subRegions
      console.log(region[index].subRegions[subIndex])
      let countys = []
      for (let i = 0; i < county.length; i++) {
        let item = {
          regionName: county[i].regionName,
          id: county[i].id
        }
        countys.push(item)
      }
      if (countys.length > 0) {
        this.setData({
          countys: countys
        })
        console.log(countys)
      }
    },
    bindChange(e) {
      let val = e.detail.value
      console.log(val)
      if (index[0] != val[0]) {
        val[1] = 0
        val[2] = 0
        this.initCitys(val[0])
        this.initCountys(val[0], val[1])
      } else {
        if (index[1] != val[1]) {
          console.log(val[1])
          val[2] = 0
          this.initCountys(val[0], val[1])
        }
      }
      index = val
      province = {
        regionName: this.data.provinces[val[0]].regionName,
        id: this.data.provinces[val[0]].id
      }
      city = {
        regionName: this.data.citys[val[1]].regionName,
        id: this.data.citys[val[1]].id
      }
      county = {
        regionName: this.data.countys[val[2]].regionName,
        id: this.data.countys[val[2]].id
      }
    },
    toggleRegion () {
      this.triggerEvent('toggleRegion', {
        isClose: true
      })
    },
    submit () {
      this.triggerEvent('toggleRegion', {
        regions: {
          province: {
            regionName: province.regionName,
            id: province.id
          },
          city: {
            regionName: city.regionName,
            id: city.id
          },
          county: {
            regionName: county.regionName,
            id: county.id
          }
        }, 
        isClose: false
      })
    }
  },
  ready () {
    this.initProvince()
  }
})
