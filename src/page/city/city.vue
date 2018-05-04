<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="wrapper-box">
      <head-top :head-title="cityName" go-back="true"></head-top>
    </div>
</template>

<script>
import headTop from '../../components/header/headTop'
import {currentcity, searchplace} from '../../service/getData'
import {getStore, setStore, removeStore} from '../../config/mUtils'

export default {
  name: 'city',
  data () {
    return {
      cityId: '',
      cityName: '' // 当前城市名称
    }
  },
  mounted () {
    this.cityId = this.$route.params.cityid
    // 获取城市名称
    currentcity(this.cityId).then(res => {
      this.cityName = res.name
    })
  },
  components: {
    headTop
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>

</style>
