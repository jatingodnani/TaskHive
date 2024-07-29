const express = require('express');
const router = express.Router();
const { Workspace, Task, Activity } = require('../models/workspacModal'); 
const User = require('../models/authModal');
router.get("/auth-users",async(req, res, next)=>{
  
  try{
    const user=await User.find();

    res.status(200).json(user);
  }catch(err){
    res.status(err.code).json("error",err.message)
  }
})
router.post('/workspaces', async (req, res) => {
  try {
    const { name, description,members } = req.body;
    const workspace = new Workspace({
      name,
      description,
      owner:req.user.id,
      members
    });
    await workspace.save();
    await new Activity({
      workspace: workspace.id,
      user: req.user.id,
      actionType: 'CREATE_WORKSPACE',
      details: { workspaceName: name }
    }).save();

    res.status(201).json(workspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/workspaces/:id', async (req, res) => {
  console.log(req.params.id,req.user)
  try {
    const workspace = await Workspace.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    console.log(workspace)
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found or you are not the owner' });
      }

    await new Activity({
      workspace: workspace.id,
      user: req.user.id,
      actionType: 'DELETE_WORKSPACE',
      details: { workspaceName: workspace.name }
    }).save();

    res.status(200).json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, priority, deadline, workspace, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      workspace,
      creator: req.user.id,
      assignedTo
    });
    await task.save();

    await new Activity({
      workspace,
      user: req.user.id,
      actionType: 'CREATE_TASK',
      taskId: task.id,
      details: { taskTitle: title }
    }).save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/workspaces/:workspaceId/tasks',  async (req, res) => {
  try {
    const tasks = await Task.find({workspace: req.params.workspaceId,
      $or:[
        { creator: req.user.id },
        { assignedTo: req.user.id }
      ]});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/workspaces', async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      $or: [
        { owner: req.user.id },
        { members: req.user.id }
      ]
    }).populate('owner', 'name email').populate('members', 'name email');
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//update
router.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, status, priority, deadline, assignedTo } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id,
      { title, description, status, priority, deadline, assignedTo },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Log activity
    await new Activity({
      workspace: task.workspace,
      user: req.user.id,
      actionType: 'UPDATE_TASK',
      taskId: task.id,
      details: { taskTitle: title, updatedFields: Object.keys(req.body) }
    }).save();

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//delete
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Log activity
    await new Activity({
      workspace: task.workspace,
      user: req.user.id,
      actionType: 'DELETE_TASK',
      taskId: task.id,
      details: { taskTitle: task.title }
    }).save();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;