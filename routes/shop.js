const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../Utility/path');

const admindata = require('./admin');


router.get('/', (req, res, next) => {
  res.render('shop');
  // console.log('shop.js',admindata.products); 
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });


module.exports = router;

