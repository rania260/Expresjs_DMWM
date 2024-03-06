//c'est notre schema => model entité comme spring
const mongoos = require('mongoose')// importation model mongoose
const bcrypt =require('bcrypt')// cryptage de notre moel
// bch nasen3ou beha l model
const userSchema=new mongoos.Schema({
    username:{type:String,unique:true},
    password:String

})

//methde apre save 
userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password'))
    {
        user.password= await bcrypt.hash(user.password,10);// ki yebda aandk traitement bch yo93ed yestana
    }
    next();
})

//na3emlou l model
const User =mongoos.model('User',userSchema)
//expoter bch nesta3emlouh
module.exports=User