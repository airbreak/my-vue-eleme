<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
    <template></template>
  </div>
</template>

<script>
import './config/rem.js'
import svgIcon from './components/common/svg'
export default {
  name: 'App',
  components: {
    svgIcon
  }
}
</script>
<style lang="sass">
@import "style/common.sass"
</style>
