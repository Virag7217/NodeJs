const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../Utility/path');
const productsController = require('../controllers/products');




router.get('/add-product', productsController.getAddProduct);

// router.get('/add-product', (req, res, next) => {
//     res.render('add-product', {pageTitle: 'Add product', path: '/admin/add-product', formCSS:true, productCSS:true});
//     // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
//   });
  
router.post('/add-product', productsController.postAddProduct);

module.exports = router;


