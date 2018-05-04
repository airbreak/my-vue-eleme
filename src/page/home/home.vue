<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="wrapper-box">
        <head-top signin-up="home">
          <span slot="logo" class="head_logo" @click="reload">ele.me</span>
        </head-top>
        <nav class="city_nav">
          <div class="city_tip">
            <span>当前定位城市:</span>
            <span>定位不准时，请在城市列表中选择</span>
          </div>
          <router-link :to="'/city/' + guessCityid " class="guess_city">
            <span>{{guessCity}}</span>
            <svg class="arrow_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
        </nav>
        <section id="hot_city_container">
          <div class="city_title">热门城市</div>
          <ul class="citylistul clear">
            <router-link tag="li" v-for="item in hotCityArr" :to="'/city/'+item.id" :key="item.id">
              {{item.name}}
            </router-link>
          </ul>
        </section>
        <section class="group_city_container">
        <ul class="letter_classify">
          <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
            <h4 class="city_title">
              {{key}}
              <span v-if="index==0">（按字母顺序）</span>
            </h4>
            <ul class="groupcity_name_container cityulistul clear">
              <router-link tag="li" v-for="item in value" :to="'/city/'+item.id" :key="item.id">
                {{item.name}}
              </router-link>
            </ul>
          </li>
        </ul>
      </section>
    </div>
</template>

<script>
import headTop from '../../components/header/headTop'
import {cityGuess, hotcity, groupcity} from '../../service/getData'

export default {
  name: 'food',
  data () {
    return {
      guessCity: '',
      guessCityid: '',
      hotCityArr: [],
      groupcity: {}
    }
  },
  mounted () {
    cityGuess().then(res => {
      this.guessCity = res.name
      this.guessCityid = res.id
    })
    hotcity().then(res => {
      this.hotCityArr = res
    })
    groupcity().then(res => {
      this.groupcity = res
    })
  },
  components: {
    headTop
  },
  computed: {
    sortgroupcity () {
      let sortobj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
        }
      }
      return sortobj
    }
  },
  methods: {
    reload () {
      window.location.reload()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../style/mixin.sass"
=city-item
    text-align: center
    color: #333
    +wh(27.5%, .35rem)
    line-height: 0.35rem
    font-size: .14rem
    margin: .1rem
    border-right: none
    background-color: #fff
    border-radius: .02rem
.wrapper-box
  background-color: #EBEBEB
  padding: .45rem 0
.head_logo
  font-weight: 400
  font-size: .14rem
  color: #fff
  width: 1rem
  display: flex
  align-items: center
  justify-content: center
.city_nav
  padding-top: .05rem
  border-top: 1px solid $bc
  .city_tip
    +fj
    line-height: .145rem
    height: .3rem
    align-items: center
    text-indent: .15rem
    background-color:
    span:nth-of-type(1)
      +sc(0.14rem, #666)
    span:nth-of-type(2)
      font-weight: 900
      +sc(0.14rem, #9f9f9f)
  .guess_city
    +fj
    align-items: center
    padding: .05rem 0
    background-color: #F5F5F5
    +font(0.75rem, 1.8rem)
    span:nth-of-type(1)
      +city-item
    .arrow_right
      +wh(.6rem, .6rem)
      fill: #999

.citylistul
  display: flex
  flex-wrap: wrap
  background-color: #F5F5F5
  li
    +city-item
.city_title
  color: #666
  font-weight: 400
  text-indent: 0.15rem
  display: flex
  align-items: center
  height: .35rem
  font-size: .15rem
  color: #999
  span
    +sc(0.14rem, #999)
.groupcity_name_container
  background-color: #F5F5F5
  li
    display: flex
    color: #666
    height: .4rem
    justify-content: flex-start
    align-items: center
    box-sizing: border-box
    font-size: .14rem
    border-bottom: .01rem solid #C9C9C9
    margin-left: .15rem
    box-sizing: border-box
    &:last-child
      border-bottom: none

</style>
