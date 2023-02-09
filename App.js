const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./Utility/database');


// const expressHbs = require('express-handlebars');

const app = express();

// app.engine('hbs',expressHbs({layoutDir: 'views/layouts/', defaultLayout: 'main-layout', extname:'hbs'}));
app.set('view engine', 'ejs');
app.set('views', 'views')

// const adminroutes = require('./routes/admin');
// const shoproutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    // User.findByPk(1)
    // .then(user => {
    //     req.user = user;
    //     next();
    // }) 
    // .catch(err => console.log(err));
});

// app.use('/admin',adminroutes);
// app.use(shoproutes);

app.use(errorController.get404);


mongoConnect(client => {
    console.log(client);
    const port = 3003
    app.listen(port , () =>{
        console.log(`server is running. Port = ${port} `);
    });  
});