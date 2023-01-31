const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', 'views')

const admindata = require('./routes/admin');
const shoproutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',admindata.routes);
app.use(shoproutes);

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname,  'views', '404.html'));
});


const port = 3003
app.listen(port , () =>{
    console.log(`server is running. Port = ${port} `);
});