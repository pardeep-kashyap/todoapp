// Configure Mongo
const mongoose = require("mongoose");
let database;
const uri = 'mongodb://127.0.0.1:27017/toDoApp'
if (database) {
    return;
}

// Connect to Mongo with Mongoose
const connect = () => {
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
database = mongoose.connection;

database.once('open', async () => {
console.log('Connected to database');
});

database.on('error', () => {
console.log('Error connecting to database');
});

}

 const disconnect = () => {
    if (!database) {
      return;
    }
    mongoose.disconnect();
  };

module.exports= {
    connect,
    disconnect
}