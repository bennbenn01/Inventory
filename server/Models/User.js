import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    userName: { type: String},
    passWord: { type: String},
});

const User =  mongoose.model('User', userSchema);
export default User;