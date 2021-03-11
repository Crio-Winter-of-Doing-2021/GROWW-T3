import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: Function,
        required: true,
    },
});

export default mongoose.model("question", questionSchema, "questions");
