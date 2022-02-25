const express = require('express');
const logger = require('../config/logger');
const db = require('../db');
//const corsMiddleware=require('../cors');
const router = express.Router();


//router.use(corsMiddleware);
//router.use(express.json());
//router.use(express.urlencoded({ extended: false }));




/**
* @swagger
*paths:
*  /:
*    get:
*      summary: Get all users
*      responses:
*         '200':
*           description: ok
*         '500':
*           description: error 
*/


router.get('/users', async (req, res, next) => {
    try {
        let results = await db.GetUsers();
        res.status(200).json(results);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


/**
* @swagger
*paths:
*  /users/{username}:
*    get:
*      summary: Get an user by name
*      description: "get an user from username parameter"
*      parameters:
*        - in: path
*          name: username
*          schema:
*            type: string
*          required: true
*          description: username
*      responses:
*         '201':
*           description: ok
*         '404':
*           description: error result
*/



router.get('/:username', async (req, res, next) => {
    try {
        let results = await db.GetUserUsername(req.params.username);
        results == null ? res.status(404).json(results) : res.status(200).json(results);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);

        

    }
});



/**
* @swagger
*paths:
*  /users:
*    post:
*      summary: Register user
*      description: "register user operation"
*      parameters:
*        - in: path
*          name: username
*          schema:
*            type: string
*          required: true
*          description: username
*        - in: path
*          name: password
*          schema:
*            type: string
*          required: true
*          description: password
*      responses:
*         '200':
*           description: ok
*         '204':
*           description: record is empty - no content
*         '500':
*           description: error
*/



//register HTTP post - HttpBody -Json:username:password
router.post('/', async (req, res, next) => {

    try {
        console.log(req.body);
        let results = await db.UserInsert(req.body);
        console.log("1");
        console.log(results);
        res.status(200).json(results);

        let _obj = { reqbody: req.body, results: results }
        logger.log('info', `Kullanıcı Kaydı Başarılı : `, _obj)
    }
    catch (e) {
        e == "record is empty" ? res.sendStatus(204) : res.sendStatus(500);

        let _obj = { reqbody: req.body, error: e }
        logger.log('error', `Kullanıcı Kayıt Sırasında Hata :`, _obj);
        
        
    }


});








module.exports = router;