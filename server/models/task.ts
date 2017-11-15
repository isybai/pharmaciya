import * as mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: String,
  type: String,
  belongTo: String,
  plan: String,
  until: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
