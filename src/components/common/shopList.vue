<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="showlist_container">
      <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
        <router-link :to="{path:'shop',query:{geohash, id:item.id}}"
                     v-for="item in shopListArr"
                     tag="li"
                     :key="item.id"
                     class="shop_li">
          <section>
            <img :src="imgBaseUrl + item.image_path" class="shop_img"/>
          </section>
        </router-link>
      </ul>
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
