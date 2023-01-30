const express = require('express');
const bodyParser = require('body-parser');

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');



const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(adminroutes);
app.use(shoproutes); 



app.listen(3003);