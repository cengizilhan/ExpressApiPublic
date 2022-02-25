const express = require('express');
const db = require('../db');


//const corsMiddleware=require('../cors');
const router = express.Router();

//router.use(corsMiddleware);
//router.use(express.json());
//router.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res, next) => {
    try {
        let results = await db.GetCategories();
        res.status(200).json(results);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


/*
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'post'

    });
});


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








module.exports = router;