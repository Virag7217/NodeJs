const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findById('63eb3b816dae31c739450e7d')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use('/admin',adminroutes);
app.use(shoproutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://virag:mongodbforvirag7217@node.fq8v4eo.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
      User.findOne().then(user => {
        if(!user){

          const user = new User({
            name: 'virag',
            email:'virag@test.com',
            cart:{
              items: []
            }
          });
          user.save();
        }
      });
      const port = 3003
      app.listen(port , () =>{
        console.log(`server is running. Port = ${port} `);
  });  
      })
    .catch(err => {
      console.log(err);
    });

