/**
 * Created by jiangjianming@bmkp.cn on 2018/4/27.
 */
import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
/*
* 获取首页默认地址
* */
export const cityGuess = () => fetch('v1/cities', {
  type: 'guess'
})

/*
* 获取首页热门城市
* */
export const hotcity = () => fetch('v1/cities', {
  type: 'hot'
})

/*
* 获取首页所有城市
* */
export const groupcity = () => fetch('v1/cities', {
  type: 'group'
})

/*
* 获取当前所在城市
* */
export const currentcity = number => fetch('/v1/cities/' + number)

/*
* 获取搜索地址
* */
export const searchplace = (cityId, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityId,
  keyword: value
})

/*
* 获取msitem页面地址信息
* */
export const msitemAddress = geohash => fetch('/v2/pois/' + geohash)

/*
* 获取msite 页面食品分类列表
* */
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
})

/*
* 获取msite商铺列表
* */
export const shopList = (latitude, longitude, offset, restaurantCategoryId = '', restaurantCategoryIds = '', orderBy = '', deliveryMode = '', supportIds = []) => {
  let supportStr = ''
  supportIds.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activeties',
    keyword: '',
    restaurantCategoryId,
    'restaurant_category_ids[]': restaurantCategoryIds,
    orderBy,
    'delevery_mode[]': deliveryMode + supportStr
  }
  return fetch('/shopping/restaurants', data)
}
/*
* 获取用户信息
* */
export const getUser = () => fetch('v1/user', {user_id: getStore('user_id')})

/*
* 个人中心里搜索地址
* */
export const getAddressList = (userId) => fetch('v1/users/' + userId + '/address')

/*
* 店铺详情
* */
export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
  latitude,
  longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
})

/*
* 获取店铺页面菜单列表
* */
export const foodMenu = restaurantId => fetch('/shopping/v2/menu', {
  restaurant_id: restaurantId
})

/*
* 获取店铺评价列表
* */
export const getRatingList = (shopId, offset, tagName = '') => fetch('/ugc/v2/restaurants/' + shopId + '/ratings', {
  has_content: true,
  offset,
  limit: 10,
  tagName
})

/*
* 获取店铺的评价分数
* */
export const ratingScores = shopId => fetch('/ugc/v2/restaurants/' + shopId + '/ratings/scores')

/*
* 获取商铺的评价分类
* */
export const ratingTags = shopId => fetch('/ugc/v2/restaurants/' + shopId + '/ratings/tags')
