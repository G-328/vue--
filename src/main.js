import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import {Button} from 'mint-ui'

import './mock/mockServer'
import './veevalidate'
import router from './router'
import store from './store'
import GshopHeader from './components/GshopHeader/GshopHeader'


//注册全局组件，语法：Vue.component(组件名，组件)
Vue.component('GshopHeader', GshopHeader)
Vue.component(Button.name, Button)
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />',
  router,  //安装路由器
  store,  //状态集中管理对象store
})
