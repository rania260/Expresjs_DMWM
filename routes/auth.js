//create router register and login
const express = require('express');
const bcrypt=require('bcrypt');
const User =require('../models/user')//imporation du modele user
const jwt=require('jsonwebtoken');
const router = express.Router();

// router.post('/login',(req,res)=>{
//    // console.log(req.body)
//     res.send(req.body);
// })

// router.get('/register',(req,res)=>{
//     res.send("<h1>Welcome to register!</h1>");
// } )

//sync: l ijeba bel wa9T 
//async: bch tabta : exemple mail
router.post('/register',async(req,res)=>{
    try{
    const {username, password} = req.body;//destructor: on veut séparer les clées de cet objet en deux partie
    const user = new User({username,password});
    await user.save();
    res.status(201).send('User registred');
    }catch(error){
        res.status(400).send(error.message); 
    }
} )

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).send( 'user not found' );
      }
      // Compare the entered password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send( 'invalid password');
      }
      //méthodologie pour crepter quelque donner: signature
      const token = jwt.sign({_id:user.id},process.env.JWT_SECRET);
      res.send({token:token})
      // send a success message
      //res.status(200).send('Login successful');
    } catch (error) {
      //console.error('Error during login:', error);
      res.status(400).send(error.message);
    }
  });

//exporter router from auth.js
module.exports = router;