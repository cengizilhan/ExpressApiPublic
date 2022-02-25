const express = require('express');
const db = require('../db');
//const corsMiddleware=require('../cors');
//file upload-multer
const multer = require('multer');
const fsExistsSync = require('fs-exists-sync');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const fs = require('fs')

        try {
            var newFileName = new Date().toISOString().slice(0, 10) + '_' + file.originalname;
            const folder = './uploads/';
            if (fs.existsSync(folder + newFileName)) {
                var num = 1;
                while (true) {

                    if (fs.existsSync(folder + '(' + num + ')_' + newFileName)) {

                    }
                    else {
                        cb(null, '(' + num + ')_' + newFileName);
                        break;
                    }
                    num++;
                }


            }
            else {
                cb(null, newFileName)

            }

            /*if (fs.existsSync(path)) {
                //file exists
                
                cb(null, '(1)_' + newFileName)
                
            } else {
                cb(null, newFileName)
            }*/


        } catch (err) {
            console.log(err);
        }


        //cb(null, new Date().toISOString().slice(0, 10) + '_' + file.originalname);

    }

});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        //cb(null,false, new Error('goes wrong on the mimetype'));
        req.fileValidationError = 'wrong file type (allow only jpg and png-s)';
        return cb(new Error('wrong file type (allow only jpg and png-s)'), false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5mb
    }, fileFilter: fileFilter
}).array('productImages', 3);

const router = express.Router();



// bu alan fileupload'a taşındı. kontrol edilip kapatılacak.
router.post('/multiupload', (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('MulterError', err);
            res.status(400).json({
                message: err
            });
            console.log("sawaaa 1");
        }
        else if (req.fileValidationError) {
            res.status(405).json({
                message: req.fileValidationError
            });
        }
        else if (err) {
            res.status(300).json({
                message: err
            });
            console.log("sawaaaa 2");
            console.log('UnhandledError', err);
        }
        else {
            res.status(200).json({
                message: 'file upload'
            });
        }
    })
    console.log(req.files);
});

//router.use(corsMiddleware);
//router.use(express.json());
//router.use(express.urlencoded({ extended: false }));
/*
router.post('/', upload.single('productImage'),(req, res, next) => {
    
  
        console.log(req.file);

        console.log("test");
   
    
    res.status(200).json({
        message: 'file upload'

    });
});
*/

/**
* @swagger
*paths:
*  /products:
*    get:
*      summary: Get all products
*      description: "Get all products"
*      responses:
*         '200':
*           description: ok
*         '500':
*           description: error
*/


router.get('/', async (req, res, next) => {
    try {
        let results = await db.all();
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
*  /products/{productid}:
*    get:
*      summary: Get product from id
*      description: "Get product from product id"
*      parameters:
*        - in: path
*          id: id
*          schema:
*            type: int
*          required: true
*          description: product id
*      responses:
*         '201':
*           description: ok
*         '500':
*           description: error result
*/

router.get('/:id', async (req, res, next) => {
    try {
        let results = await db.one(req.params.id);
        res.status(200).json(results);

    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);

    }
});


/*
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Update product'
    });
});


router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete product'
    });
});
*/

/*
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'alperen') {
        res.status(200).json({
            message: 'kral hoş geldin',
            id: id
        });
    }
    else {
        res.status(200), json({
            message: 'id yanlış'
        })
    }
})
*/

/*
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'sawacrow',
        
    });
})
*/







module.exports = router;