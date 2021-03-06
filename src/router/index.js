import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const home = resolve => require(['../page/home/home'], resolve)
const city = resolve => require(['../page/city/city'], resolve)
const msite = resolve => require(['../page/msite/msite'], resolve)
const search = resolve => require(['../page/search/search'], resolve)
const shop = resolve => require(['../page/shop/shop'], resolve)
const foodDetail = resolve => require(['../page/shop/children/foodDetail'], resolve)
const shopDetail = resolve => require(['../page/shop/children/shopDetail'], resolve)
const shopSafe = resolve => require(['../page/shop/children/children/shopSafe'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      children: [{
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: home
      },
      {
        path: '/city/:cityid', // 当前选择城市页
        component: city
      },
      // 所有商铺列表页
      {
        path: '/msite',
        component: msite,
        meta: { keepAlive: true }
      },
      // 搜索页
      {
        path: '/search/:geohash',
        component: search
      },
      // 店铺详情页
      {
        path: '/shop',
        component: shop,
        children: [{
          path: 'foodDetail', // 食品详情页
          component: foodDetail
        }, {
          path: 'shopDetail', // 商铺详情页
          component: shopDetail,
          children: [{
            path: 'shopSafe',
            component: shopSafe
          }]
        }]
      }]
    }
  ]
})
