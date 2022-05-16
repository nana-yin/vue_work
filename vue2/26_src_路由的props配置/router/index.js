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
              component: Detail,
              // props配置的第一种写法，值为对象。该对象的每一组key-value都会 通过props传给Detail组件
              // props: {
              //   id: '123',
              //   title: '这是假数据'
              // },

              // props配置的第二种写法，值为布尔值。把路由接收到的所有的params参数 通过props 传给Detail组件
              // props: true,

              // props配置的第三种写法，值为函数。该函数返回的每一组key-value都会 通过props传给Detail组件
              // props(route) {
              //   return {
              //     id: route.query.id,
              //     title: route.query.title
              //   }
              // }
              props({params: {id,title}}) {
                return {id,title}
              }
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