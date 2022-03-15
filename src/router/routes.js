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
import playlist from "../pages/musicPage/playlist.vue";
import mylike from "../pages/passion/mylike.vue";
import radio from "../pages/passion/radio.vue";
import index from "../pages/index/index.vue";
import musicdetail from "../pages/musicPage/musicdetail.vue";
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
    {path: '/musicPage/musicdetail', component: musicdetail},
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

