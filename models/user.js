import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username already exists!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
})

{/* First looking into models and check if the user is there ? and if not then create a new one */}
const User = models.User || model("User", UserSchema);

export default User;