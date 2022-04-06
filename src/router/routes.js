import dashboard from "../pages/dashboard.vue";
import NotFoundView from "../components/404.vue";
import menuList from "../pages/sys/menu.vue";
import role from "../pages/sys/role.vue";
import resource from "../pages/sys/resource.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import sysUser from "../pages/sys/user.vue";
import userAdd from "../pages/sys/userAdd.vue";
import resetPwd from "../pages/resetPwd.vue";
// import Operatormanagement from "../pages/operator/operatorManagement.vue";
import systemconfig from "../pages/system/systemConfig.vue";
import carMessage from "../pages/system/carMessage.vue";
import carManage from "../pages/system/carManage.vue";
import carOutManage from "../pages/system/carOutManage.vue";
import carSearch from "../pages/system/search.vue";
import workstation from "../pages/system/workstation.vue";
import data from "../pages/system/data.vue";
import musicSearch from "../pages/musicPage/search.vue";
import playListMusic from "../pages/musicPage/playListMusic.vue";
import playlist from "../pages/musicPage/playlist.vue";
import mylike from "../pages/passion/mylike.vue";
import radio from "../pages/passion/radio.vue";
import singlist from "../pages/passion/singlist.vue";
import mv from "../pages/passion/mv.vue";
import mvplay from "../pages/passion/mvplay.vue";
import singer from "../pages/passion/singer.vue";
import singerMusic from "../pages/passion/singerMusic.vue";
import index from "../pages/index/index.vue";
import musicdetail from "../pages/musicPage/musicdetail.vue";
import musicPlayer from "../pages/musicPage/musicPlayer.vue";
// Routes
const routes = [
  {path: '/login', component: login},
  {
    path: '/test', component: app, children: [
    {path: '*', component: NotFoundView}
  ]
  },
  {
    path: '', component: app, children: [
    {path: '/musicPage/musicSearch', component: musicSearch},
    {path: '/musicPage/playlist', component: playlist},
    {path: '/passion/mylike', component: mylike},
    {path: '/passion/radio', component: radio},
    {path: '/passion/singlist', component: singlist},
    {path: '/passion/mv', component: mv},
    {path: '/passion/mvplay', component: mvplay},
    {path: '/passion/singer', component: singer},
    {path: '/passion/singerMusic', component: singerMusic},
    {path: '/musicPage/musicdetail', component: musicdetail},
    {path: '/musicPage/playListMusic', component: playListMusic},
    {path: '/musicPage/musicPlayer', component: musicPlayer},
    {path: '/resetPwd', component: resetPwd},
    {path: '/', component: index},
    {path: '/sys/menuList', component: menuList},
    {path: '/sys/roleList', component: role},
    {path: '/sys/userList', component: sysUser},
    {path: '/sys/userAdd', component: userAdd},
    // {path: '/operator/Operatormanagement', component: Operatormanagement},
    {path: '/system/systemconfig', component: systemconfig},
    {path: '/system/carMessage', component: carMessage},
    {path: '/system/carManage', component: carManage},
    {path: '/system/carOutManage', component: carOutManage},
    {path: '/system/carSearch', component: carSearch},
    {path: '/system/workstation', component: workstation},
    {path: '/system/data', component: dashboard},
    {path: '/sys/resource', component: resource}
  ]
  },
  {path: '*', component: NotFoundView}
]


export default routes

