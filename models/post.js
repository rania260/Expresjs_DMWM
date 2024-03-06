//c'est notre schema => model entité comme spring
const mongoos = require('mongoose')// importation model mongoose
//const bcrypt =require('bcrypt')// cryptage de notre moel
// bch nasen3ou beha l model
//pour générer la partie crud il faut créer la partie middlware
//middelware bch yaaml traitement mou3ayna: yvérifie haja mou3yna: yaaml test : yji entre l path w req: verifie si la req contient un token ou non
const postSchema=new mongoos.Schema({
    title:{type:String,unique:true},
    description:String,
    author:{
        type : mongoos.Schema.Types.ObjectId,
        ref:'User'
    }
})

//na3emlou l model
const Post =mongoos.model('Post',postSchema)
//expoter bch nesta3emlouh
module.exports=Post