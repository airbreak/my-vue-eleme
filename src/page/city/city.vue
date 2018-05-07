<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <div class="wrapper-box">
      <head-top :head-title="cityName" go-back="true">
        <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
      </head-top>
      <div class="position_box">
        <form class="city_form" v-on:submit.prevent>
          <div>
            <input type="search" name="city" placeholder="输入学校、商务楼、地址"
                   class="city_input input_style" v-model="keywords" require/>
          </div>
        </form>
        <header v-if="historyTitle" class="pois_search_history">搜索历史</header>
        <ul class="getpois_ul">
          <li v-for = "(item, index) in placeList" @click="nextpage(index, item.geohash)" :key="index">
            <h4 class="pois_name ellipsis">{{item.name}}</h4>
            <p class="pois_address ellipsis">{{item.address}}</p>
          </li>
        </ul>
        <footer v-if="historyTitle && placeList.length" class="clear_all_history" @click="clearAll">清空记录</footer>
      </div>
    </div>
</template>

<script>
import headTop from '../../components/header/headTop'
import {currentcity, searchplace} from '../../service/getData'
import {getStore, setStore, removeStore, debounce} from '../../config/mUtils'

export default {
  name: 'city',
  data () {
    return {
      cityId: '',
      cityName: '', // 当前城市名称,
      keywords: '', // 地理位置
      historyTitle: true,
      placeList: [],
      placeNone: false,
      placeHistory: [] // 历史搜索记录
    }
  },
  mounted () {
    this.cityId = this.$route.params.cityid
    // 获取城市名称
    currentcity(this.cityId).then(res => {
      this.cityName = res.name
    })
    this.doSearchFn = this.doSearchFn()
    this.initData()
  },
  components: {
    headTop
  },
  watch: {
    keywords (newVal, oldVal) {
      this.doSearchFn()
    }
  },
  methods: {
    // 获取搜索历史记录
    initData () {
      let history = getStore('placeHistory')
      if (history) {
        this.placeList = JSON.parse(history)
      } else {
        this.placeList = []
      }
    },
    doSearchFn () {
      return debounce(() => {
        searchplace(this.cityId, this.keywords).then(res => {
          this.historyTitle = false
          this.placeList = res
          this.placeNone = !res.length
        })
        console.log(123)
      }, 500)
    },
    nextpage (index, geohash) {
      let history = getStore('placeHistory')
      let choosePlace = this.placeList[index]
      if (history) {
        let checkrepeat = false
        this.placeHistory = JSON.parse(history)
        this.placeHistory.forEach(item => {
          if (item.geohash === geohash) {
            checkrepeat = true
          }
        })
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace)
        }
      } else {
        this.placeHistory.push(choosePlace)
      }
      setStore('placeHistory', this.placeHistory)
      this.$router.push({path: '/msite',query :{geohash}})
    },
    clearAll () {
      removeStore('placeHistory')
      this.initData()
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../style/city.sass'
</style>
