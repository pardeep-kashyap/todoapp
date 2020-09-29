const mongoose  = require('mongoose');
const Schema =  mongoose.Schema;
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };
const Task = new Schema({
    taskName:String,
    descriptions:String,
    status:{
        type:Boolean,
        default:false
    },
    scheduledFor:Date,
    attachment:String,
    important:{
        type:Boolean,
        default:false
    },
},schemaOptions);
module.exports = mongoose.model('task',Task)