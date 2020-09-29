const userAPI= require('./apis/user');
const taskAPI= require('./apis/task');
module.exports = function(app)
{
    app.post('/api/user/create',userAPI.createNewUser);
    app.get('/api/user/find/username',userAPI.findUserByUsername);
    app.post('/api/user/login',userAPI.login);
    app.get('/api/task/all',taskAPI.fetchAllTask);
    app.post('/api/task/save',taskAPI.findOneAndUpdateTask);
    app.delete('/api/task/delete',taskAPI.findOneAndDelete);
}