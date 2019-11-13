<template>
  <div id="goodContainer">
    <div class="leftContainer">
      <ul class="navList" ref="leftUl">
        <li class="navItem" :class="{active: navIndex === index}" @click="changeNavIndex(index)" v-for="(good, index) in goods" :key="index">
          <p>{{good.name}}</p>
        </li>
      </ul>
    </div>
    <div class="rightContainer" >
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57"
                     :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  CartControl组件
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  import {mapState} from 'vuex'
  import {getShopDatas} from '../../../api'
  export default {
    data() {
      return {
        scrollY: 0, //记录右侧滑动内容区滑动的距离
        tops: [], //记录右侧所有li到滑动页面顶部的距离
      }
    },
    async mounted() {
      //防止切换到商家或者评价后切换回来不能滚动的问题
      if (this.goods) {
        this.initScroll()
        this.initTops()
        }

      let result = await getShopDatas()
      console.log(result)
    },
    computed: {
      ...mapState({
        goods: state => state.shop.shopDatas.goods
      }),
      navIndex() {
        //计算属性只要一改变就会从新计算
        let {scrollY, tops} = this
        let index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])
        if (this.leftscroll && index !== this.index ) {
          this.index = index
          this.leftscroll.scrollToElement(this.$refs.leftUl.children[index], 1000)
        }
        return index
      }
    },
    methods: {
      initScroll() {
        this.leftscroll = new Bscroll('.leftContainer',{
          scrollY: true, //设置纵向滑动
          click: true //允许点击
        })
        this.rightscroll = new Bscroll('.rightContainer',{
          scrollY: true, //设置纵向滑动
          probeType: 2,
        })

        this.rightscroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y) 
        })
        this.rightscroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      },
      initTops() {
        //记录右侧所有li到滑动页面顶部的距离
        let tops = []
        let top = 0
        tops.push(top)
        let lis = Array.from(this.$refs.rightUl.children)
        for (var i = 0; i < lis.length; i++) {
          top += lis[i].clientHeight
          tops.push(top);
        }
        this.tops = tops
      },
      changeNavIndex(index) {
        this.scrollY = this.tops[index]
        this.rightscroll.scrollTo(0, -this.scrollY, 2000)
      }
    },
    watch: {
      goods() {
        this.$nextTick(() => { //页面下一次全部渲染完毕
          this.initScroll()
          this.initTops()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  #goodContainer
    display flex
    /* position absolute
    top 224px
    bottom 0 */
    height calc(100vh - 224px)
    overflow hidden
    .leftContainer
      background #f3f5f7
      width 80px
      .navList
        .navItem
          height 40px
          line-height 40px
          margin 0 auto 
          text-align center
          &.active
            background #fff
          p
            width 70px
            border-bottom 1px solid rgba(7,17,27,0.1)
    .rightContainer
      width 295px
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px


 
</style>
