const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../Utility/path');
const adminController = require('../controllers/admin');




router.get('/add-product', adminController.getAddProduct);

// router.get('/add-product', (req, res, next) => {
//     res.render('add-product', {pageTitle: 'Add product', path: '/admin/add-product', formCSS:true, productCSS:true});
//     // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
//   });

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

module.exports = router;


