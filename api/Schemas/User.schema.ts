import {Schema, model} from "mongoose";
export interface UserInterface {
    _id: string;
    username: String;
    password: String;
    createdAt: Date;
}
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default model('User', userSchema);