const express  = require('express')
// 使用插件 connect-history-api-fallback 解决history刷新页面的问题（前端路径当做请求资源的问题）
const history = require('connect-history-api-fallback')
const app = express()
// 1.前端使用的是hash模式，就不用后端配合
// 2.如果前端使用的是history模式，需要后端配合。
//   使用插件 connect-history-api-fallback
app.use(history())
// 使用静态资源
app.use(express.static(__dirname+'/static'))


// 发送请求
app.get('/person',(resquest,response) => {
  response.send({
    name: 'tom',
    age: 18
  })
})
// 启动服务器
app.listen(5005, (err) => {
  if(!err) console.log('服务器启动成功了')
})