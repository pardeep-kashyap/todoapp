const mongoose  = require('mongoose');
const Schema =  mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const UserSchema = new Schema({
    username:{
        type:String,
        required: true, 
        unique:true
    },
    password:{
        type:String,
        required: true, 
    },
    firstName:String,
    lastName:String,
    email:String,
    age:Number,
    picture:String
});
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) return next(error);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('user',UserSchema);
