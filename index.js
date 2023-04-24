// Description: This is the main file of the project
// require express

const express = require('express');
const port = 5000;

// require mongoose
const mongoose = require('mongoose');




// create express app
const app = express();

// setup our view engine
app.set('view engine','ejs');
app.set('views','./views');

// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/regDB',{useNewUrlParser:true,useUnifiedTopology:true})
const db= mongoose.connection;


// add the middleware before the routes
app.use(express.json());

app.use(express.urlencoded({extended:false}));

// import routes
const userRoute = require('./routes/user');
app.use('/public/web', userRoute);

// to check if the connection is established or not
db.on('open',()=>{
    console.log('connection established wiht mongoDB');
})



// listen to the server
app.listen(port,(err)=>{
    if(err){
        console.log(`problem in running the server ${err}`);

    }
    console.log(`server is running on port ${port}`);
})
