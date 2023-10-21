import mongoose, {Schema, models} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

// export user model

const UserModel = models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
