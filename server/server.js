let express = require('express')

let app = express()

let data = Object.keys(Array.apply(null, {length:100})).map((item,index) => {
  return {
    name: 'name' + index,
    age: 18 + index
  }
})

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/getData', (req, res) => {
  res.send({
    code: 200,
    list: data.slice(Number(req.query.pageSize) * Number(req.query.pageNumber) - 10 || 0 , Number(req.query.pageSize) * Number(req.query.pageNumber)),
    msg: '获取成功'
  })
})

app.listen('8888',function() {
  console.log('服务启动完成')
})