const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleError= err=>{
    let error= { email: '', password: ''}

    //Login errors
    if(err.message === 'Incorrect email') {
        error.email = 'That email is not registered';
    }
    if(err.message === 'Incorrect password') {
        error.password = 'That password is incorrect';
    }
    
    if(err.message.includes('user validation failed')){
        console.log(err);
    }

    return error;
    
}

const maxAge= 1*24*60*60;
const createToken = (id)=>{
    //Here the payload to be signed is the user id
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });

}

module.exports.signIn = async (req, res)=>{
    const {email, password} = req.body;
    try{
       const user = await User.login(email, password);
       const token = createToken(user._id);
       res.header('authorization', token);
        res.status(200).json({user: user._id, token});
    }catch(err){
        const error= handleError(err);
        res.status(400).json({ error });
    }
}

module.exports.register = async (req, res)=>{
    const {email, password} = req.body;
    
    try{
        const user = await User.create({ email, password });
        res.status(201).json({ user: user._id });
    }catch(err){
        handleError(err);
        res.send('user not created');
    }
}

module.exports.logout = (req, res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.json({});
    
}

