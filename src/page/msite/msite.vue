<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="wrapper-box">
      <head-top signin-up="msite">
        <router-link :to="'/search/geohash'" class="link_search" slot="search">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
            <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
        </router-link>
        <router-link :to="'/search/geohash'" class="link_search" slot="search">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
            <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
        </router-link>
        <router-link to="/home" slot="msite-title" class="msite_title">
          <span class="title_text ellipsis">{{msiteTitle}}</span>
        </router-link>
      </head-top>
      <nav class="msite_nav">
        <div v-if="foodTypes.length>0">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="(item, index) in foodTypes" :key="index">
              <router-link class="nav_menu_item" v-for="(menuInfo,menuIndex) in item"
                           :key="menuIndex"
                           :to="{path:'/food',query:{geohash,title:menuInfo.title,restaurant_category_id: getCategoryId(menuInfo.link)}}">
                <img :src="imgBaseUrl + menuInfo.image_url">
                <span>{{menuInfo.title}}</span>
              </router-link>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination"></div>
        </div>
        <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
      </nav>
      <div class="shop_list_container">
        <header class="shop_header">
          <svg class="shop_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
          </svg>
          <span class="shop_header_title">附近商家</span>
        </header>
        <shop-list v-if="hasGetData" :geohas="geohash"></shop-list>
      </div>
      <foot-guide></foot-guide>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import headTop from '../../components/header/headTop'
import footGuide from '../../components/footer/footGuide'
import {msitemAddress, msiteFoodTypes, cityGuess} from '../../service/getData'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ShopList from '../../components/common/shopList'
export default {
  name: 'food',
  data () {
    return {
      geohash: '',
      msiteTitle: '请选择地址……',
      foodTypes: [],
      hasGetData: false,
      imgBaseUrl: 'https://fuss10.elemecdn.com', // 图片域名地址
      swiperOptions: {
        notNextTick: true,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        paginationType: 'bullets',
        paginationClickable: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  async beforeMount () {
    if (!this.$route.query.geohash) {
      const address = await cityGuess()
      this.geohash = address.latitude + ',' + address.longtitude
    } else {
      this.geohash = this.$route.query.geohash
    }
    // 保存到geohash到vuex
    this.SAVE_GEOHASH(this.geohash)
    // 获取位置信息
    let res = await msitemAddress(this.geohash)
    this.msiteTitle = res.name
    this.RECORD_ADDRESS(res)
    this.hasGetData = true
  },
  mounted () {
    msiteFoodTypes(this.geohash).then(res => {
      let resArr = [...res]
      let foodArr = []
      let diff = 8
      for (let i = 0; i < resArr.length; i += diff) {
        foodArr.push(resArr.slice(i, i + diff))
      }
      this.foodTypes = foodArr
    })
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS', 'SAVE_GEOHASH'
    ]),
    // 解码url地址，除去restaurant_category_id值
    getCategoryId (url) {
      let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      } else {
        return ''
      }
    }
  },
  components: {
    ShopList,
    headTop,
    footGuide,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="sass" scoped>
  @import '../../style/msite.sass'
</style>
