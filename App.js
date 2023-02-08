const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./Utility/database');

// const expressHbs = require('express-handlebars');

const app = express();

// app.engine('hbs',expressHbs({layoutDir: 'views/layouts/', defaultLayout: 'main-layout', extname:'hbs'}));
app.set('view engine', 'ejs');
app.set('views', 'views')

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');
const errorController = require('./controllers/error');

// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result);
// })
// .catch(err => {
//     console.log(err);
    
// })
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminroutes);
app.use(shoproutes);

app.use(errorController.get404);

sequelize.sync()
    .then(result => {
        console.log(result);
        const port = 3003
        app.listen(port , () =>{
        console.log(`server is running. Port = ${port} `);
        });
    })
    .catch(err => {
        console.log(err);           
    })

