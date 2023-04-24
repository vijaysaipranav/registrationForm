const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {registerValidation , loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');


router.get('/home',(req,res)=>{
    res.render('home');

})

router.get('/register',(req,res)=>{
    res.render('Register');
    
})

router.get('/login',(req,res)=>{
    res.render('login');
    
})

// registration logic
router.post("/register",async (req,res)=>{
    //validating the data (whether the requirements are set or not)
    // using hapi joi api
    const {error}= registerValidation(req.body);
    if (error){
        return res.status(400).send(error);
    }


    
    //checking if the user is already in the DB
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);
    // create a new user
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    });
    // saving the user to the DB
    try{
        const userData = newUser.save();
        res.status(200).render('login');
    }
    catch(err){
        res.status(400).send(err);
}
})

// login Logic
// valideate the data 
router.post('/login',async (req,res)=>{
    //validating the data (whether the requirements are set or not)
    // using hapi joi api
    const {error}= loginValidation(req.body);
    if (error){
        return res.status(400).send(error);
    }
    // checking if the email exists
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).render('register');
    // password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid password');

    res.status(200).render('home');
})


// export your folder for sure 
module.exports = router;