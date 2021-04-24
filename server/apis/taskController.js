var Task = require('../models/Task-model');
const mongoose  = require('mongoose');
const fetchAllTask =async (req,res)=>{
    let task={};
    if(req.query.taskId){
        task._id=req.query.taskId
    }
    if(req.query.email){
        task.email=req.query.email
    }
    try{
        let response= await Task.find(task).sort({ 'created_at' : -1 }).exec();
        if(response.length){
            res.status(200).json(
                {
                    "success":true,
                    "data":response
                }
            )
        }else{
            res.status(404).json(
                {
                    "success":false,
                    "message":'No data Found'
                }
            )
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json(
            {
                "success":false,
                "error":err,
                "message":'Something Went wrong'
            }
        )
    }
}

const findOneAndUpdateTask =async (req,res)=>{
    let body=req.body;
    body._id = body._id ||  new mongoose.mongo.ObjectID();
    try{
        let response= await Task.findOneAndUpdate(
            {_id:body._id},
            {$set: body},
            { useFindAndModify: false,upsert:true, new : true });
        if(!response.error){
            res.status(200).json(
                {
                    "success":true,
                    "data":response
                }
            )
        }else{
            res.status(404).json(
                {
                    "success":false,
                    "message":'No data Found'
                }
            )
        }
    }
    catch(err) {
        console.log("err",err)
        res.status(500).json(
            {
                "success":false,
                "err":err,
                "message":'Something Went wrong'
            }
        )
    }
}

const findOneAndDelete =async (req,res)=>{
    try{
        let response= await Task.findByIdAndRemove(
            req.query.taskId,
            { useFindAndModify: false });
            console.log(response)
        if(response !== null){
            res.status(200).json(
                {
                    "success":true,
                    "data":response
                }
            )
        }else{
            res.status(404).json(
                {
                    "success":false,
                    "message":'No data Found'
                }
            )
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json(
            {
                "success":false,
                "error":err,
                "message":'Something Went wrong'
            }
        )
    }
}

module.exports={
    fetchAllTask,
    findOneAndUpdateTask,
    findOneAndDelete
}