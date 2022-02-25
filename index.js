const http= require('http');
const app = require('./app');
const corsMiddleware=require('./api/cors');
const port=process.env.PORT || 3000;

const server = http.createServer(app);
console.log("express-api online");
app.use(corsMiddleware);
console.log("cors online");

server.listen(port)