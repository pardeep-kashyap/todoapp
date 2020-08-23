const User = require('./../models/User-model');
const createNewUser=(req, res )=>{
    const user = new User(
        req.body
    );
    user.save()
       .then(users => {
        if(users && users._id.length > 0){
            res.status(200).json(
             {
                 "status":'success',
                 "message":'User Created Success fully'
             }
            )
        }
       })
       .catch(err => {
        if(err){
            res.status(500).json(
                {
                    "status":'failure',
                    "message":'Something Went wrong'
                }
            )
        }
       });
}

const findUserByUsername=(req, res )=>{
    const { username }= req.query;
    if(!username){
        res.status(200).json({
            "status":'failure',
            "message":"Username is missing in request"
        }); 
        return;
    }
    User.find({username})
       .then(users => {
        if(users && users.length > 0){
            res.status(200).json(
             {
                 "status":'failure',
                 "message":'User Already Exists'
             }
            )
        }else{
            res.status(200).json(
                {
                "status":'success',
                    "message":'Username is available'
                }
               )
        }
       })
       .catch(err => {
        if(err && err.length>0){
            res.status(500).json(
                {
                    "status":'failure',
                    "message":'Something Went wrong'
                }
            )
        }
       });
}

const login=(req, res )=>{
    const { username }= req.body;
    if(!username){
        res.status(200).json({
            "status":'failure',
            "message":"Username is missing in request"
        }); 
        return;
    }
    User.findOne({username})
       .then(user => {
        if(user){
        user.comparePassword(req.body.password , function(err, isMatch) {
           if(isMatch){
            delete user.password;
            const loginDetail={
                email:user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }
            res.status(200).json(
                {
                "status":'success',
                "loginDetail":loginDetail,
                "message":'Login Successful'
                }
               )
           }else{
            res.status(200).json(
                {
                "status":'failure',
                "message":'Wrong Username or Password'
                }
               )
           }
        });

        }else{
            res.status(200).json(
                {
                "status":'failure',
                "message":'Wrong Username or Password'
                }
               )
        }
       })
       .catch(err => {
        if(err && err.length>0){
            res.status(500).json(
                {
                    "status":'failure',
                    "message":'Something Went wrong'
                }
            )
        }
       });
}

module.exports ={
    createNewUser,
    findUserByUsername,
    login
}