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
}).array('productImages', 3); //multiupload or .single()



const router = express.Router();


/**
* @swagger
* /fileupload/multiupload:
*    post:
*      summary: "uploads image multi or single"
*      description: "required an jpg or png file"
*      operationId: "uploadFile"
*      consumes:
*      - "multipart/form-data"
*      produces:
*      - "application/json"
*      parameters:
*      - name: "file"
*        in: "formfile"
*        description: "image file"
*        required: true
*        type: "png"
*      - name: "image file"
*        in: "formfile"
*        description: "image file"
*        required: true
*        type: "jpg"
*      responses:
*        "200":
*          description: "file uploaded"
*          schema:
*        "405":
*          description: "file validation error"
*          schema:
*        "300":
*          description: "sys error"
*          schema:
*            
*/

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

module.exports = router;