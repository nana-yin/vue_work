import VueRouter from 'vue-router'
// 路由组件放在pages中
import Home from '../pages/home'
import About from '../pages/about'
import Message from '../pages/message'
import News from '../pages/news'
import Detail from '../pages/detail'

// 一级路由加/,子路由无需加/
const router =  new VueRouter({
  routes: [
    {
      name: 'shouye',
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      name: 'guanyu',
      path: '/about',
      component: About,
      meta: {
        title: '关于'
      },
      children: [
        {
          name: 'xaioxi',
          path: 'message',
          component: Message,
          meta: {
            title: '消息',
            isAuth: true
          },
          children: [
            {
              name: 'xiangqing',
              path: 'detail',
              component: Detail
            }
          ],
          // 独享路由守卫，只有这一个
          // beforeEnter(to,form,next) {
          //   console.log('独享路由守卫',to,form)
          //   if(to.meta.isAuth) { // 用于鉴权
          //     alert('暂无权限查看！')
          //   } else {
          //     next()
          //   }
          // }
        },
        {
          name: 'xinwen',
          path: 'news',
          component: News,
          meta: {
            title: '新闻',
            isAuth: true
          }
        }
      ]
    }
  ]
})


// 全局前置路由守卫 --- 初始化的时候调用，每次路由切换之前调用
// router.beforeEach((to,form,next) => {
//   console.log('前置路由的守卫',to,form)
//   if(to.meta.isAuth) { // 用于鉴权
//     alert('暂无权限查看！')
//   } else {
//     next()
//   }
// })

// // 全局后置路由守卫 --- 每次路由切换之后调用
// router.afterEach((to,from) => {
//   console.log('后置路由的导航守卫', to,from)
//   document.title = to.meta.title || 'Vue2总结'
// })


export default router