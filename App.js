const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const MONGODB_URI = 'mongodb+srv://virag:mongodbforvirag7217@node.fq8v4eo.mongodb.net/shop';


const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions'
});


app.set('view engine', 'ejs');
app.set('views', 'views')

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');
const authroutes = require('./routes/auth');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false , saveUninitialized: false, store: store}));

app.use('/admin',adminroutes);
app.use(shoproutes);
app.use(authroutes);

app.use(errorController.get404);

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)
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
          user.save()
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

