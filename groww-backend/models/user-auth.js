import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userAuthSchema = new Schema({
    user_account_id: { type: String, default: "" },
    email_id: { type: String, default: "" },
    password: { type: String, default: "" },
});

export default mongoose.model("user-auth", userAuthSchema, "auth");
