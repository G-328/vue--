import Vue from 'vue'

import {getShopDatas} from '../../api'
import {SAVE_SHOPDATAS, ADD_FOOD_COUNT, DEL_FOOD_COUNT} from '../mutations-type'

const state = {
  shopDatas: {},  //初始化商家信息
  cartShops: [],  //购物车的数据
}

const actions = {
  async getShopDatasAction({commit}){
    let result = await getShopDatas()
    if (result.code === 0) {
      commit(SAVE_SHOPDATAS, {shopDatas: result.data})
    }
  }
}

const mutations = {
  [SAVE_SHOPDATAS](state, {shopDatas}) {
    state.shopDatas = shopDatas
  },
  [ADD_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count++
    }else {
      Vue.set(food, 'count', 1)
      state.cartShops.push(food)
    }
  },
  [DEL_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count--
      if(!!!food.count){
        //从购物车删除商品
        state.cartShops.splice(state.cartShops.indexOf(food), 1)
      }
    }
  }
}

const getters = {
/*   cartShops(state) {
    return state.shopDatas.goods.reduce((pre, good) => {
      pre.push(...good.foods.filter(food => food.count))
      return pre
    },[])
  } */
  totalCount(state) {
    return state.cartShops.reduce((pre, food) => {
      return pre += food.count
    }, 0)
  },
  totalPrice(state) {
    return state.cartShops.reduce((pre, food) => {
      return pre += food.count * food.price
    }, 0)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}