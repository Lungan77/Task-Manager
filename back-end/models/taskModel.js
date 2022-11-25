import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
    task: {
        type: String,
        required: [true, 'please add a goal']
    }
},
{
    timestamps: true
});

const task = mongoose.model('Task', TaskSchema);

export default task;