const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const User = require('./models/user');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

// app.use((req, res, next) => {
//     User.findById('63ea0a61248df96c436632e9')
//       .then(user => {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//       })
//       .catch(err => console.log(err));
//   });

app.use('/admin',adminroutes);
app.use(shoproutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://virag:mongodbforvirag7217@node.fq8v4eo.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
      const port = 3003
      app.listen(port , () =>{
        console.log(`server is running. Port = ${port} `);
  });  
      })
    .catch(err => {
      console.log(err);
    });

