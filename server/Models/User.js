import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        province: { type: String, required: true },
        zip: { type: String, required: true },
    },
    age: { type: Number, required: true, min: 1, max: 120 },
    position: { type: String, required: true },
    startedDate: { type: String, required: true }
}, { collection: 'users' });

const User =  mongoose.model('User', userSchema);
export default User;