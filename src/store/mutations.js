/**
 * Created by jiangjianming@bmkp.cn on 2018/4/27.
 */
import {
  RECORD_ADDRESS,
  ADD_CART,
  REDUCE_CART,
  INIT_BUYCART,
  CLEAR_CART,
  RECORD_SHOPDETAIL,
  RECORD_USERINFO,
  GET_USERINFO,
  CONFIRM_REMARK,
  CONFIRM_INVOICE,
  CHOOSE_SEARCH_ADDRESS,
  SAVE_GEOHASH,
  CONFIRM_ADDRESS,
  CHOOSE_ADDRESS,
  NEED_VALIDATION,
  SAVE_CART_ID_SIG,
  SAVE_ORDER_PARAM,
  CHANGE_ORDER_PARAM,
  ORDER_SUCCESS,
  SAVE_SHOPID,
  SAVE_ORDER,
  OUT_LOGIN,
  RETSET_NAME,
  SAVE_AVANDER,
  SAVE_ADDRESS,
  SAVE_ADDDETAIL,
  SAVE_QUESTION,
  ADD_ADDRESS,
  BUY_CART
} from './mutation-types'

import { setStore, getStore} from '../config/mUtils'

import { localapi,proapi } from 'scr/config/env'

export default {
  // 记录当前经度纬度
  [RECORD_ADDRESS] (state, {latitude, longtitude}) {
    state.latitude = latitude
    state.longtitude = longtitude
  },
  [RECORD_SHOPDETAIL] (state, detail) {
    state.shopDetail = detail
  },
  [ADD_CART] (state, {
    shopid,
    categoryId,
    itemId,
    foodId,
    name,
    price,
    specs,
    packingFee,
    sku_id,
    stock
  }) {
    let cart = state.cartList
    let shop = cart[categoryId] = (cart[shopid] || {})
    let category = shop[categoryId] = (shop[categoryId] || {})
    let item = category[itemId] = (category[itemId] || {})
    if (item[foodId]) {
      item[foodId]['numm']++
    } else {
      item[foodId] = {
        'num': 1,
        'id': foodId,
        'name': name,
        'price': price,
        'specs': specs,
        'packing_fee': packingFee,
        'skuid': sku_id,
        'stock': stock
      }
    }
    state.cartList = {...cart}
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },

  // 移除购物车
  [REDUCE_CART](state, {
    shopId,
    categoryId,
    itemId,
    foodId,
    name,
    price,
    specs
  }) {
    let cart = state.cartList
    let shop = (cart[shopId] || {})
    let category = (shop[categoryId] || {})
    let item = (category[itemId] || {})
    if (item && item[foodId]) {
      if (item[foodId]['num'] > 0) {
        item[foodId]['num']--
        state.cartList = {...cart}
        // 存入localStorage
        setStore('buyCart', state.cartList)
      } else {
        item[foodId] = null
      }
    }
  },

  // 网页初始化时从本地缓存读取购物车
  [INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 清空当前商品的购物车信息
  [CLEAR_CART] (state, shopid) {
    state.cartList[shopid] = null
    state.cartList = {...state.cartList}
    setStore('buyCart', state.cartList)
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('user_id', info.user_id)
  },
  // 获取用户信息存入vuex
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!state.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
  // 修改用户名
  [RETSET_NAME] (state, username) {
    state.userInfo = Object.assign({}, state.userInfo, {username})
  },
  // 保存商户id
  [SAVE_SHOPID] (state, shopid) {
    state.shoopid = shopid
  },
  // 记录订单页面用户选择的备注，传递给订单确认页面
  [CONFIRM_REMARK] (state, {
    remarkText,
    inputText
  }) {
    state.remarkText = remarkText
    state.inputText = inputText
  },
  // 是否开发票
  [CONFIRM_INVOICE] (state, invoice) {
    state.invoice = invoice
  },
  // 选择搜索地址
  [CHOOSE_SEARCH_ADDRESS] (state, place) {
    state.searchAddress = place
  },
  // 保存geohash
  [SAVE_GEOHASH] (state, geohash) {
    state.geohash = geohash
  },
  // 确定订单页面添加新的地址
  [CONFIRM_ADDRESS] (state, newAddress) {
    state.newAddress.push(newAddress)
  },
  // 选择的地址
  [CHOOSE_ADDRESS] (state, {
    address,
    index
  }) {
    state.chooseAddress = address
    state.addressIndex = index
  },
  // 保存下单后需要验证的返回值
  [NEED_VALIDATION](state, needValidation) {
    state.needValidation = needValidation
  },
  // 保存下单后购物id 和 sig
  [SAVE_CART_ID_SIG] (state, orderParam) {
    state.orderParam = orderParam
  },
  // 修改下单参数
  [CHANGE_ORDER_PARAM] (state, newParam) {
    state.orderParam = Object.assign({}, state.orderParam, newParam)
  },
  // 下单成功，保存订单返回信息
  [ORDER_SUCCESS] (state, order) {
    state.cartPrice = null
    state.orderMessage = order
  },
  // 进入订单详情页前保存该订单信息
  [SAVE_ORDER] (state, orderDetail) {
    state.orderDetail = orderDetail
  }
}
