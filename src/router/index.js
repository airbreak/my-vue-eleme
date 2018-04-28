import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const home = resolve => require(['../page/home/home'], resolve)
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
      }]
    }
  ]
})
