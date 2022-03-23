import 'babel-polyfill'
import Vue from "vue";
import frame from "./frame.vue";
import router from "./router";
import store from "./store";
import axios from "./common/axios";
import filters from "./filters";
import VueProgressBar from "vue-progressbar";
import VueRouter  from "vue-router";
import Element from "element-ui";
import 'element-ui/lib/theme-default/index.css';
import ImpPanel from "./components/panel.vue";
import vueAplayer from 'vue-aplayer'
import AudioVisual from 'vue-audio-visual'
import qs from 'qs'
Vue.use(AudioVisual)
Vue.use(vueAplayer)
Vue.prototype.$http = axios
Vue.axios = axios
Vue.http = axios;

Vue.prototype.$qs = qs
Vue.use(axios);
Vue.use(VueRouter);  //使用路由
import Cookies from 'js-cookie' // 引入
Vue.prototype.$Cookies = Cookies // 注册全局引用
Vue.use(Element);

Vue.component(ImpPanel.name, ImpPanel);

Vue.use(VueProgressBar, {
  color: '#eeeeee',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  store,
  router,
  el: "#root",
  render: h => h(frame)
})
