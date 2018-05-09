<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="rating_container">
      <section class="star_container">
        <svg class="grey_fill" v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
        </svg>
      </section>
      <div :style="'width:'+ rating * 2 / 10 + 'rem'" class="star_overflow">
        <section class="star_container">
          <svg class="orange_fill" v-for="num in 5" :key="num">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
          </svg>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  name: 'rating-star',
  props: ['rating']
}
</script>

<style lang="sass" scoped>
  @import "../../style/mixin"
  .rating_container
    position: relative
    top: .2rem
    +wh(1rem, .35rem)
    .star_overflow
      overflow: hidden
      position: relative
      height: 100%
    .star_container
      position: absolute
      display: flex
      width: .7rem
      height: 0.12rem
      .grey_fill
        fill: #d1d1d1
      .orange_fill
        fill: #ff9a0d
</style>
