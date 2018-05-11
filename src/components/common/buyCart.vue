<!--Created by jiangjianming@bmkp.cn on 2018/4/27.-->
<template>
    <section class="cart_module">
      <section v-if="!foods.specifications.length" class="cart_button">
        <transition name="showReduce">
          <span @click="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name)"></span>
        </transition>
      </section>
    </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'buy-cart',
  data () {
    return {
      showMoveDot: [] // 控制下落的小圆点显示隐藏
    }
  },
  mounted() {

  },
  methods: {
    ...mapMutations([
      'ADD_CART', 'REDUCE_CART'
    ]),
    // 移除购物车
    removeOutCart (categoryId, itemId, foodId, name, price, specs, packingFee, skuId, stock) {
      if (this.foodNum > 0) {
        this.REDUCE_CART({shopid: this.shopId,
          categoryId,
          itemId,
          foodId,
          name,
          price,
          specs,
          packingFee,
          skuId,
          stock})
      }
    },
    // 加入购物车
    addToCart (categoryId, itemId, foodId, name, price, specs, packingFee, skuId, stock, event) {
      this.ADD_CART({shopId: this.shopId,
        categoryId,
        itemId,
        foodId,
        name,
        packingFee,
        skuId,
        stock})
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
