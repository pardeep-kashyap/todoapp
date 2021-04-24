const {createNewUser,findUserByUsername,login,googleController} = require('./apis/userController');
const { fetchAllTask, findOneAndUpdateTask, findOneAndDelete} = require('./apis/taskController');
module.exports = function(app)
{
    app.post('/api/user/create',createNewUser);
    app.get('/api/user/find/username',findUserByUsername);
    app.post('/api/user/login',login);
    app.post('/api/user/googleLogin',googleController);
    app.get('/api/task/all',fetchAllTask);
    app.post('/api/task/save',findOneAndUpdateTask);
    app.delete('/api/task/delete',findOneAndDelete);
}