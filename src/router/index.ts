import { createRouter,createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:()=>import('../views/user/user-login.vue'),
      meta:{title:'用户登录'}
    },
    {
      path:'/register',
      component:()=>import('../views/user/user-register.vue'),
      meta:{title:'用户注册'}
    },
    {
    path:'/userinfo',
    component: ()=> import('../views/user/user-info.vue'),
    meta:{title:'进入首页'}
  }

  ]
})
export default router
