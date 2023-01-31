const express = require('express');
const router = express.Router();

// const path = require('path');
// const rootDir = require('../Utility/path');
// const admindata = require('./admin');

const productsController = require('../controllers/products');


router.get('/',productsController.getProducts);
// router.get('/', (req, res, next) => {
//   const products = admindata.products;
//   res.render('shop', {prods: products,pageTitle: 'Shop', path: '/', hasproducts: products.length > 0 , activeShop : true, productCSS: true, activeAddProduct:true});
//   // console.log('shop.js',admindata.products); 
//   // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
//   });


module.exports = router;

