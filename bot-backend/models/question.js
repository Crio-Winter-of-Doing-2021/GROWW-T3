import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    answer: Function,
});

export default mongoose.model("question", questionSchema, "questions");
