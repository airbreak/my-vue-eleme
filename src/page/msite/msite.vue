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
        <div class="swiper-container" v-if="foodTypes.length">
          <div class="swiper-wrapper">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide>I'm Slide 1</swiper-slide>
              <swiper-slide>I'm Slide 1</swiper-slide>
              <swiper-slide>I'm Slide 1</swiper-slide>
              <swiper-slide>I'm Slide 1</swiper-slide>
            </swiper>
          </div>
        </div>
      </nav>
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
export default {
  name: 'food',
  data () {
    return {
      geohash: '',
      msiteTitle: '请选择地址……',
      foodTypes: [],
      hasGetData: false,
      imgBaseUrl: 'https://fuss10.elemecdn.com' // 图片域名地址
    }
  },
  components: {
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
