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
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');
const Order = require('./models/order');





// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result);
// })
// .catch(err => {
//     console.log(err);
    
// })
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    }) 
    .catch(err => console.log(err));
});

app.use('/admin',adminroutes);
app.use(shoproutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'} );
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});



sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        // console.log(result);
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            return User.create({name:'virag' , email:'test@test.com'});
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
        
    })
    .then(cart => {
        const port = 3003
        app.listen(port , () =>{
            console.log(`server is running. Port = ${port} `);
        });
    })
    .catch(err => {
        console.log(err);           
    })

    