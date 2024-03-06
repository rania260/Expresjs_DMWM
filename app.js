//code prof
const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./routes/auth')
const product = require('./routes/product')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const post = require('./models/post')
// instance from express 
const app = express()

//congiguration le file env 
dotenv.config()// bch yaaref chnoua dotenv fy wost l prohet
const MONGODB_URL= process.env.MONGODB_URL //bchj yaaref anehou l fichier li bch ya9ra menou
const PORT = process.env.PORT || 5000


app.use(bodyParser.json())

app.use('/auth',auth)
app.use('/product',product)
app.use('/post',post)

/* app.get('/products',(req,res)=>{
    res.send({name:'product 1',price:100})
}) */

app.get('/template',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

//http://localhost:9000/user/?name=john&password=azerty
app.get('/user',(req,res)=>{
    res.send({name:req.query.name,password:req.query.password})
})

//http://localhost:9000/post/john/azerty
app.get('/post/:name/:password',(req,res)=>{
    res.send({name:req.params.name,password:req.params.password})
})

app.get('/redirect',(req,res)=>{
    res.redirect('/products')
})

app.get('/',(req,res)=>{
    res.send('Hello World')
})



//creation of the server instance 
app.listen(9000,()=>{
    console.log('Server is running on port 9000')
})

mongoose.connect(MONGODB_URL).then(()=>{
    console.log('connected to the database');
    //app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`);})
}).catch(err=>{console.log(err);})


