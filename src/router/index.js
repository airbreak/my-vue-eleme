import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const home = resolve => require(['../page/home/home'], resolve)
const city = resolve => require(['../page/city/city'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      children: [{
        path: '',
        component: home
      }, {
        path: '/city/:cityid', // 当前选择城市页
        component: city
      }]
    }
  ]
})
