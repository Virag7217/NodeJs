const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();

// app.engine('hbs',expressHbs({layoutDir: 'views/layouts/', defaultLayout: 'main-layout', extname:'hbs'}));
app.set('view engine', 'ejs');
app.set('views', 'views')

const admindata = require('./routes/admin');
const shoproutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',admindata.routes);
app.use(shoproutes);

app.use((req,res,next) => {
    res.status(404).render('404',{pageTitle: 'Page Not Found'});
    // res.status(404).sendFile(path.join(__dirname,  'views', '404.html'));
});


const port = 3003
app.listen(port , () =>{
    console.log(`server is running. Port = ${port} `);
});