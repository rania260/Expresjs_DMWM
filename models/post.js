//c'est notre schema => model entité comme spring
const mongoos = require('mongoose')// importation model mongoose
const bcrypt =require('bcrypt')// cryptage de notre moel
// bch nasen3ou beha l model
const postSchema=new mongoos.Schema({
    title:{type:String,unique:true},
    description:String

})

//na3emlou l model
const Post =mongoos.model('Post',postSchema)
//expoter bch nesta3emlouh
module.exports=Post