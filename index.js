//imports
let express = require('express');
let mongoose = require('mongoose');

const model = require("./model");
const User = model.User;

let router = require('./router');

//create
let app = express()

//using json
app.use(express.json())

//compare password test
// const test = async (email,password)=>{
// const user = await User.findOne({email:email});
// console.log(user);
// const result = await user.comparePassword(password);
// console.log(result);
// }

// test('email','123');



//link Route
app.use('/',router);

//listen app
app.listen(2000,()=>{
    console.log('listening');
});

//connect moongoose to db
mongoose.connect('mongodb://localhost:27017/FundooDb',(error)=>
{
    if(error) console.log('connection error')
    else console.log('connection succesfull')
});