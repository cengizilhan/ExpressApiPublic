const logger = require('./api/config/logger');
const http= require('http');
const app = require('./app');
const port= process.env.YOUR_PORT || process.env.PORT || 5050;
const host = process.env.YOUR_HOST || '0.0.0.0';

const server = http.createServer(app);
console.log("online");


server.listen(port, host, function() {
    var port=server.address().port;
    var host=server.address().adress;
    console.log("Server started.......", port, host, app.get('env'));
    logger.log('info',`server up and running on port : ${port}`)
  });


