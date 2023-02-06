const express = require('express');
const router = express.Router();

// const path = require('path');
// const rootDir = require('../Utility/path');
// const admindata = require('./admin');

const shopController = require('../controllers/shop');


router.get('/',shopController.getIndex);
// router.get('/', (req, res, next) => {
//   const products = admindata.products;
//   res.render('shop', {prods: products,pageTitle: 'Shop', path: '/', hasproducts: products.length > 0 , activeShop : true, productCSS: true, activeAddProduct:true});
//   // console.log('shop.js',admindata.products); 
//   // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
//   });
router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);


module.exports = router;

