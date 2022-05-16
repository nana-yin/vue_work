import VueRouter from 'vue-router'
// 路由组件放在pages中
import Home from '../pages/home'
import About from '../pages/about'
import Message from '../pages/message'
import News from '../pages/news'
import Detail from '../pages/detail'

// 一级路由加/,子路由无需加/
export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      name: 'guanyu',
      path: '/about',
      component: About,
      children: [
        {
          name: 'xaioxi',
          path: 'message',
          component: Message,
          children: [
            {
              name: 'xiangqing',
              path: 'detail/:id/:title',
              component: Detail
            }
          ]
        },
        {
          path: 'news',
          component: News
        }
      ]
    }
  ]
})