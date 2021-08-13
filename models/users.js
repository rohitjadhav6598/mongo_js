const mongoose = require('mongoose');
let userSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    address:String
});
module.exports=mongoose.model('users',userSchema);

//{"_id":{"$oid":"611642987751ed378b037a27"},"name":"Bruce","email":"bruce@test.com","address":"USA"}