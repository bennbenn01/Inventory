import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName:  { type: String, required: true },
    feedBack: { type: String, required: true }
}, { collection: 'userFeedback' });

const userFeedback = mongoose.model('userFeedback', userSchema);
export default userFeedback;