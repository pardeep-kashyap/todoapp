const userAPI= require('./apis/user');
module.exports = function(app)
{
    app.post('/api/user/create',userAPI.createNewUser);
    app.get('/api/user/find/username',userAPI.findUserByUsername);
    app.post('/api/user/login',userAPI.login);
}