import * as mongoose from 'mongoose';

const medicSchema = new mongoose.Schema({
  name: String,
  sur: String,
  dob: Number
});

const Medic = mongoose.model('Medic', medicSchema);

export default Medic;