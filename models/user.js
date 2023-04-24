// create your schema here
const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min : 8,

    },

},{timestamps:true});

module.exports = mongoose.model('User',userSchema);
// model is a wrapper here (user is a collection name )
