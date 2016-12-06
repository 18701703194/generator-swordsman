import Api from '@gfe/bp-entertainment-api'

const apiList = {
  getShops: {
    url: '//e.dianping.com/joy/merchant/joyShopList',
    args: {}
  }
}

export default Api(apiList)