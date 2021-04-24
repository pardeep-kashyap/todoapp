const User = require('../models/User-model');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT);

const findUserFromMongoDB=(username)=>{
   return User.find({username})
}

const createNewUserMongoDb=(userObj)=>{
    const user = new User(
        userObj
    );
   return user.save()
}

const createNewUserObjFromGoogleResponse=(response)=>{
    return {
        username:response.payload.email,
        password:response.payload.at_hash,
        email:response.payload.email,
        lastName:response.payload.name.split(' ')[1],
        firstName:response.payload.name.split(' ')[0],
        picture:response.payload.picture
    }
}
const createNewUser=(req, res )=>{
    const user = new User(
        req.body
    );
    user.save()
       .then(users => {
        console.log(typeof users);
        if(users && users._id){
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
                    "message":'Something Went wrong',
                    "error":err
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

const googleController =async (req,res)=>{
    const {idToken}= req.body
    const response = await googleClient.verifyIdToken({idToken,audience:process.env.REACT_APP_GOOGLE_CLIENT})
    console.log("Google Login Response--> ",response);
    const findUserResponse= await findUserFromMongoDB(response.payload.email);
    console.log("findUserResponse-->",findUserResponse);
    if(!findUserResponse.length){
     const createNewUserMongoDbResponse=await createNewUserMongoDb(createNewUserObjFromGoogleResponse(response));
     console.log(createNewUserMongoDbResponse);
     findUserResponse.push(createNewUserMongoDbResponse);
    }
    const loginDetail={
        email:findUserResponse[0].email,
        firstName: findUserResponse[0].firstName,
        lastName: findUserResponse[0].lastName,
        username: findUserResponse[0].username,
        picture:findUserResponse[0].picture,
    }
    res.status(200).json(
        {
        "status":'success',
        "loginDetail":loginDetail,
        "message":'Login Successful'
        }
       )
}

module.exports ={
    createNewUser,
    findUserByUsername,
    login,
    googleController
}