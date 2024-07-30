const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'userDetail'},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userDetail' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

//task
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    required: true,
    enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'],
    default: 'To-Do'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'Urgent']
  },
  columns: { type: String,default:"todo" },
  deadline: { type: Date },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'userDetail', required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userDetail' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
TaskSchema.pre('save',async  function(next){
   if(this.isModified("assignedTo")|| this.isNew){
    try{
   const workspace=await mongoose.model('Workspace').findById(this.workspace);
   if(!workspace){
    throw new Error("Couldn't find workspace")
   }

   const assignedUser=this.assignedTo.filter(each=>
    !workspace.members.includes(each) &&!workspace.owner.equals(userId))
    if (assignedUser.length > 0) {
      throw new Error('Some assigned users are not members of the workspace');
    }

    next();
   }
  catch(e){
    next(e);
  }
}
})

const ActivitySchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'userDetail',
    required: true
  },
  actionType: { 
    type: String,
    enum: ['CREATE_WORKSPACE', 'DELETE_WORKSPACE', 'CREATE_TASK', 'UPDATE_TASK', 'DELETE_TASK'],
    required: true
  },
  taskId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model('Activity', ActivitySchema);



const Workspace = mongoose.model('Workspace', WorkspaceSchema);
const Task = mongoose.model('Task', TaskSchema);

module.exports = {Workspace, Task,Activity };