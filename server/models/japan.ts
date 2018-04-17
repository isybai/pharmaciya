import * as mongoose from 'mongoose';

const japanSchema = new mongoose.Schema({
  name: String,
  purpose: String,
  dose: String,
});

const japan = mongoose.model('japan', japanSchema);

export default japan;
