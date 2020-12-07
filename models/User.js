const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: [true, 'The email should be in lower case letters'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    }
});
//this will be fired before the user is saved
//password hashing
// userSchema.pre('save', async function (next){
//     //generating a string to be attached to the password before hashing it
//     const salt = await bcrypt.genSalt();
//     //hashing the password
//     this.password= await bcrypt.hash(this.password, salt);
//     next();//without next the code doen's go on
// });

//static method to log users in
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;