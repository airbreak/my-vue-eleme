<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <header id="head_top">
      <slot name="logo"></slot>
      <slot name="search"></slot>
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill: none;stroke:rgb(255,255,255)"></polyline>
        </svg>
      </section>
      <router-link :to="userInfo? '/profile':'/login'" v-if="signinUp" class="head_login">
        <svg class="user_avatar" v-if="userInfo" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
        </svg>
        <span class="login_span" v-else>登录|注册</span>
      </router-link>
      <section class="title_head ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </section>
      <slot name="edit"></slot>
      <slot name="msite-title"></slot>
      <slot name="changecity"></slot>
      <slot name="changeLogin"></slot>
    </header>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'headTop',
  data () {
    return {

    }
  },
  mounted () {
    // 获取用户信息
    this.getUserInfo()
  },
  props: ['signinUp', 'headTitle', 'goBack'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ])
  }
}
</script>

<style lang="sass" scoped>
  @import "../../style/mixin"
  #head_top
    display: flex
    align-items: center
    background-color: $blue
    position: fixed
    z-index: 100
    left: 0
    top: 0
    +wh(100%,.45rem)
    .head_goback
      +wh(0.6rem, .25rem)
      margin-left: .15rem
    .head_login
      right: 0.25rem
      +sc(0.14rem, #fff)
      +ct
      .login_span
        color: #fff
      .user_avatar
        fill: #fff
        +wh(.8rem, .8rem)
    .title_head
      +center
      width: 50%
      color: #fff
      text-align: center
      .title_text
        +sc(0.14rem, #fff)
        text-align: center
        font-weight: bold
</style>
