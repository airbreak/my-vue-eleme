<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="showlist_container">
      <ul v-load-more="loaderMore">
        <li></li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'shop-list',
  data () {
    return {
      touchend: false,
      preventRepeatReuqest: false
    }
  },
  methods: {
    async initData () {
      console.log(1)
    },
    async loaderMore () {
      if (this.touchend) {
        return
      }
      // 防止重复请求
      this.showLoading = true
      this.preventRepeatReuqest = true
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../style/common/shoplist.sass'
</style>
