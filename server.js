const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/', express.static( 'examples' ));
app.use('/dist', express.static( 'dist' ));

app.get('/',function(req,res) {
	const homepage = path.join(__dirname,'./examples/index.html');
	res.sendFile( homepage );
  });

app.listen(port, () => console.log(`前端服务监听端口：${port}，在浏览器访问http://localhost:${port}`));
