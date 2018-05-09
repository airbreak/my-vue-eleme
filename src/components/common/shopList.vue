<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="showlist_container">
      <!--<ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">-->
      <ul v-if="shopListArr.length" type="1">
        <router-link :to="{path:'shop',query:{geohash, id:item.id}}"
                     v-for="item in shopListArr"
                     tag="li"
                     :key="item.id"
                     class="shop_li">
            <img :src="imgBaseUrl + item.image_path" class="shop_img"/>
            <div class="shop_right">
              <header class="shop_detail_header">
                <h4 :class="item.is_premium?'premium':''" class="shop_title ellipsis">{{item.name}}</h4>
                <ul class="shop_detail_ul">
                  <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
                </ul>
              </header>
              <div class="rating_order_num">
                <section class="rating_order_num_left">
                  <div class="rating_section">
                    <rating-star :rating="item.rating"></rating-star>
                    <span class="rating_num">{{item.rating}}</span>
                  </div>
                  <div class="order_section">
                    月售{{item.recent_order_num}}单
                  </div>
                </section>
                <section class="rating_order_num_right">
                  <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                  <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
                </section>
              </div>
              <div class="fee_distance">
                <p class="fee">
                  ￥{{item.float_minimum_order_amount}}起送
                  <span class="segmentation">/</span>
                  {{item.piecewise_agent_fee.tips}}
                </p>
                <p class="distance_time">
                  <span v-if="Number(item.distance)">
                    {{item.distance > 1000 ? item.distance.toFixed(2)+'km': item.distance + 'm'}}
                    <span class="segmentation">/</span>
                  </span>
                  <span v-else>{{item.distance}}</span>
                  <span class="segmentation">/</span>
                  <span class="order_time">{{item.order_lead_time}}</span>
                </p>
              </div>
            </div>
        </router-link>
      </ul>
      <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 10" :key="item">
          <img src="../../images/shopback.svg" class="list_back_svg">
        </li>
      </ul>
      <p v-if="touchend" class="empty_data">全部加载完毕</p>
      <aside class="return_top" @click="backTop" v-if="showBackStatus">
        <svg class="back_top_svg">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
        </svg>
      </aside>
      <transition name="loading">
        <loading v-show="showLoading"></loading>
      </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {shopList} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
import {showBack, animate} from '../../config/mUtils'
import loading from './loading'
import ratingStar from './ratingStar'
export default {
  name: 'shop-list',
  data () {
    return {
      offset: 0,
      shopListArr: [],
      touchend: false,
      preventRepeatReuqest: false,
      showLoading: true, // 加载动画
      imgBaseUrl,
      showBackStatus: false
    }
  },
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
  mounted () {
    this.initData()
  },
  computed: {
    ...mapState([
      'latitude', 'longitude'
    ])
  },
  methods: {
    // 获取数据
    async initData () {
      let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId)
      this.shopListArr = [...res]
      if (res.length < 20) {
        this.touchend = true
      }
      this.hideLoading()
      // 监听scrollTop 的值，达到一定后显示返回顶部按钮
      showBack(status => {
        this.showBackStatus = status
      })
    },
    hideLoading () {
      this.showLoading = false
    },
    async loaderMore () {
      if (this.touchend) {
        return
      }
      // 防止重复请求
      this.showLoading = true
      this.preventRepeatReuqest = true
    },
    zhunshi (supports) {
      let zhunshiStatus
      if ((supports instanceof Array) && supports.length) {
        supports.forEach(item => {
          if (item.icon_name === '准') {
            zhunshiStatus = true
          }
        })
      } else {
        zhunshiStatus = false
      }
      return zhunshiStatus
    },
    backTop () {
      animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
    }
  },
  components: {
    loading,
    ratingStar
  }
}
</script>

<style lang="sass" scoped>
@import '../../style/common/shoplist.sass'
</style>
