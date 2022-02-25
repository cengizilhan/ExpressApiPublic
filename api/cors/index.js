const cors=require('cors');

const corsOptions= {
    origin:'https://mybacnk.com',
    optionsSuccessStatus:200,
    allRoutes: true,
    origin: '*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    headers: 'content-type'
};
module.exports=cors(corsOptions);