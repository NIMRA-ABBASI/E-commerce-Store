import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, min: 3, max: 200 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },
  password: { type: String, required: true,min: 8 },
  role:{type:String, enum:['admin','user'], default: "user" }
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
