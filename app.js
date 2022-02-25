/*
Notlar
1-Bu uygulama kapalı olunca, siteden kayıt olmaya çalışınca "bu üye mevcut" gibi yanlış uyarı geliyor.

*/
require("dotenv").config();
const express = require('express');
const corsMiddleware=require('./api/cors');



const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
// https://swagger.io/specification/
const swaggerOptions=
{swaggerDefinition:{
    info:{
        title: "E-Commerce API",
        description: "Ecommerce API - expressjs",
        version: "1.0.0", // version number
        contact: {
          name: "Sawacrow",
          email:"iletisim@cebraililhan.com"
        },
        servers:[
            {
                url:"http://localhost"
            }
        ],
        license: {
          name: "Apache 2.0",
          url: "https://www.apache.org/licenses/LICENSE-2.0.html"
        },
        version: "1.0.1"
      }},
      // [.routes./*.js]
      apis:["./api/routes/*.js"]
}


const swaggerDocs=swaggerJsDoc(swaggerOptions);



const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const productRoutes = require('./api/routes/products');
const categoriesRoutes = require('./api/routes/categories');
const usersRoutes = require('./api/routes/users');
const fileUpload = require('./api/routes/fileupload');
const logger = require('./api/config/logger');



app.use(express.static("public")) 


/* test */
app.get('/', (req, res) => {
  res.format({
    'text/plain': function () {
      res.send('hey')
    },
  
    'text/html': function () {
      res.send('<p>hey html</p>')
    },
  
    'application/json': function () {
      res.send({ message: 'hey' })
    },
  
    default: function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
    }
  })
})

app.use('/products', productRoutes);
app.use('/categories', categoriesRoutes);
app.use('/users',usersRoutes);
app.use('/fileUpload',fileUpload);




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));








module.exports = app;

