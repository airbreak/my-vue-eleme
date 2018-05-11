<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="wrapper-box">
      <section v-if="!showLoading" class="shop_container">
        <nav class="goback" @click="goback">
          <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
          </svg>
        </nav>
        <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities?'14':'10'}">
          <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img">
          <section class="description_header">
            <router-link to="/shop/shopDetail" class="description_top">
              <section class="description_left">
                <img :src="imgBaseUrl + shopDetailData.image_path">
              </section>
              <section class="description_right">
                <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
                <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟送达/配送费￥{{shopDetailData.float_delivery_fee}}</p>
                <p class="description_promotion ellipsis">公告：{{promotionsInfo}}</p>
              </section>
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
              </svg>
            </router-link>
            <footer class="description_footer" v-if="shopDetailData.activities.length">
              <p class="ellipsis">
                <span class="tip_icon" :style="{backgroundColor:'#' + shopDetailData.activities[0].icon_color,borderColor:'#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
                <span>{{shopDetailData.activities[0].description}}(APP专享)</span>
              </p>
              <p>{{shopDetailData.activities.length}}个活动</p>
              <svg class="footer_arrow">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
              </svg>
            </footer>
          </section>
        </header>
        <transition name="fade">
          <section class="activities_details" v-if="showActivities">
            <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
            <div class="activities_ratingstar">
              <rating-star :rating="shopDetailData.rating"></rating-star>
            </div>
            <section class="activities_list">
              <header class="activities_title_style">
                <span>优惠信息</span>
              </header>
              <ul>
                <li v-for="item in shopDetailData.activities" :key="item.id">
                  <span class="activities_icon" :style="{backgroundColor:'#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                  <span>{{item.description}}(App专享)</span>
                </li>
              </ul>
            </section>
            <section class="activities_shopinfo">
              <header class="activities_title_style">
                <span>商家公告</span>
              </header>
              <p>{{promotionsInfo}}</p>
            </section>
            <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
              <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
              <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
              <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
            </svg>
          </section>
        </transition>
        <section class="change_show_type" ref="chooseType">
          <div>
            <span :class="{activity_show:changeShowType == 'food'}" @click="changeShowType = 'food'">商品</span>
          </div>
          <div>
            <span :class="{activity_show:changeShowType == 'rating'}" @click="changeShowType='rating'">评价</span>
          </div>
        </section>
        <transition name="fade-choose">
          <section v-show="changeShowType=='food'" class="food_container">
            <section class="menu_container">
              <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                <ul>
                  <li v-for="(item,index) in menuList" :key="index"
                      class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                    <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                    <span>{{item.name}}</span>
                    <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                  </li>
                </ul>
              </section>
              <section class="menu_right" ref="menuFoodList">
                <ul>
                  <li v-for="(item, index) in menuList" :key="index">
                    <header class="menu_detail_header">
                      <section class="menu_detail_header_left">
                        <strong class="menu_item_title">{{item.name}}</strong>
                        <strong class="menu_item_description">{{item.description}}</strong>
                      </section>
                      <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                      <p class="description_tip" v-if="index==titleDetailIndex">
                        <span>{{item.name}}</span>
                        {{item.description}}
                      </p>
                    </header>
                    <section v-for="(foods, foodIndex) in item.foods" :key="foodIndex" class="menu_detail_list">
                      <router-link :to="{pathL:'shop/foodDetail', query:{
                        image_path:foods.image_path,
                        desription:foods.description,
                        month_sales:foods.month_sales,
                        name:foods.name,
                        rating:foods.rating,
                        rating_count:foods.rating_count,
                        satisfy_rate:foods.satisfy_rate,
                        foods,
                        shopId}}" tag="div" class="menu_detail_link">
                          <section class="menu_food_img">
                            <img :src="imgBaseUrl + foods.image_path">
                          </section>
                        <section class="menu_food_description">
                          <h3 class="food_description_head">
                            <strong class="description_foodname">{{foods.name}}</strong>
                            <ul v-if="foods.attributes.length" class="attributes_ul">
                              <li v-for="(attributes, foodindex) in foods.attributes" :key="foodindex"
                              :style="{color:'#' + attribute.icon_color, borderColor:'#' + attribute.icon_color}" :class="{attribute_new:attribute.icon_Name === '新'}">
                                <p :style="{color:attribute.icon_name == '新' ? '#fff':'#'+attribute.icon_color}">
                                  {{attribute.icon_name == '新'?'新品':attribute.icon_name}}
                                </p>
                              </li>
                            </ul>
                          </h3>
                          <p class="food_description_content">{{foods.description}}</p>
                          <p class="food_description_sale_rating">
                            <span>月售{{foods.month_sales}}份</span>
                            <span>好评率{{foods.satisfy_rate}}%</span>
                          </p>
                          <p v-if="foods.activity" class="food_activity">
                            <span :style="{color:'#' + foods.activity.image_text_color,borderColor:'#' + foods.activity.icon_color}">
                              {{ foods.activity.image_text }}
                            </span>
                          </p>
                        </section>
                      </router-link>
                      <footer class="menu_detail_footer">
                        <section class="food_price">
                          <span>￥</span>
                          <span>{{foods.specfoods[0].price}}</span>
                          <span v-if="foods.specifications.lenght">起</span>
                        </section>

                      </footer>
                    </section>
                  </li>
                </ul>
              </section>
            </section>
          </section>
        </transition>
      </section>
      <transition name="fade"></transition>
      <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
        <img src="../../images/shop_back_svg.svg">
      </section>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {msitemAddress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from '../../service/getData'
import loading from '../../components/common/loading'
import buyCart from '../../components/common/buyCart'
import ratingStar from '../../components/common/ratingStar'
import {loadMore, getImgPath} from '../../components/common/mixin'
import {imgBaseUrl} from '../../config/env'
import BScroll from 'better-scroll'
export default {
  name: 'food',
  data () {
    return {
      geohash: '', // geohash位置信息
      shopId: null, // 店铺id
      showLoading: false, // 显示加载动画
      changeShowType: 'food', // 切换显示商品或者评价
      shopDetailData: null, // 店铺详情
      showActivities: true, // 是否显示活动详情
      menuList: [], // 食品列表
      menuIndex: 0, // 已选菜单索引值，默认0
      menuIndexChange: true, // 解决选中index时，scroll监听事件重复判断设置index的bug
      shopListTop: [], // 商品列表的高度集合
      titleDetailIndex: null, // 点击展开列表头部详情
      categoryNum: [], // 商品类型右上角已计入购物车的数量
      totalPrice: 0, // 总价格
      cartFoodList: [], // 购物车商品列表
      showCartList: false, // 显示购物车列表
      ratingList: null, // 评价列表
      ratingOffset: 0, // 评价获取数据offset值
      ratingScoresData: null, // 评价总体分数
      ratingTagsList: null, // 评价分数列表
      ratingTagIndex: 0, // 评价分类索引
      preventRepeatRequest: false, // 防止多次触发数据请求
      ratingTagName: '', // 评论类型
      loadRatings: false, // 加载更多评论是显示加载组件
      foodScroll: null, // 食品列表scrool
      showSpecs: false, // 控制显示食品规格
      specsIndex: 0, // 当前选中的规格索引值
      chooseFoods: null, // 当前选中的食品数据
      showDeleteTip: false, // 多规格商品点击减按钮，弹出提示框
      showMoveDot: [], // 控制下落的小圆点显示隐藏
      windowHeight: null, // 屏幕的高度
      elLeft: 0, // 当前点击加按钮在网页中的绝对top 值
      ratingScroll: null, // 评论页Scrool
      imgBaseUrl
    }
  },
  created () {
    this.geohash = this.$route.query.geohash
    this.shopId = this.$route.query.id
    this.INIT_BUYCART()
  },
  mounted () {
    this.initData()
    // this.windowHeight()
  },
  mixins: [loadMore, getImgPath],
  watch: {
    // showLoading 变化是触发
    showLoading: function (value) {
      if (!value) {
        this.$nextTick(() => {
          this.getFoodListHeight()
        })
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS',
      'ADD_CART',
      'REDUCE_CART',
      'INIT_BUYCART',
      'CLERT_CART',
      'RECORD_SHOPDETAIL'
    ]),
    // 初始化时获取数据
    async initData () {
      if (!this.latitude) {
        // 获取当前的位置信息
        let res = await msitemAddress(this.geohash)
        this.RECORD_ADDRESS(res)
      }
      // 获取商铺信息
      this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude)
      // 分类列表
      this.menuList = await foodMenu(this.shopId)
      // 评论列表
      this.ratingList = await getRatingList(this.shopId, this.ratingOffset)
      // 商铺评论详情
      this.ratingScoresData = await ratingScores(this.shopId)
      // 评论Tag列表
      this.ratingTagsList = await ratingTags(this.shopId)
      this.RECORD_SHOPDETAIL(this.shopDetailData)
      this.hideLoading()
    },
    // 获取食品列表的高度，存入shopListTop
    getFoodListHeight () {
      const listContainer = this.$ref.menuFoodList
    },
    hideLoading () {
      this.showLoading = false
    },
    goback () {
      this.$router.go(-1)
    },
    // 控制活动详情页的显示隐藏
    showActivitiesFun () {
      this.showActivities = !this.showActivities
    },
    // 点击左侧食品列表标题，相应的列表移动到最顶层
    chooseMenu (index) {
      this.menuIndex = index
      this.menuIndexChange = false
      // this.foodScroll.scroolTo(0, -this.shopListTop[index],400)
    },
    showTitleDetail (index) {
      if (this.titleDetailIndex === index) {
        this.titleDetailIndex = null
      } else {
        this.titleDetailIndex = index
      }
    }
  },
  components: {
    loading,
    ratingStar,
    buyCart
  },
  computed: {
    ...mapState([
      'latitude', 'longitude', 'cartList'
    ]),
    promotionsInfo: function () {
      return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
    },
    // 配送费
    deliveryFee: function () {
      if (this.shopDetailData) {
        return this.shopDetailData.float_delivery_fee
      } else {
        return null
      }
    },
    // 还差多少钱起送，为负数时显示去结算按钮
    minimumOrderAmount: function () {
      if (this.shopDetailData) {
        return this.shopDetailData.float_minimum_order_amount - this.totalPrice
      } else {
        return null
      }
    },
    // 当前商店购物信息
    shopCart: function () {
      return {...this.cartList[this.shopId]}
    },
    // 购物车中总共商品的数量
    totalNum: function () {
      let num = 0
      this.cartFoodList.forEach(item => {
        num += item.num
      })
      return num
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../../style/shop/shop"
</style>
