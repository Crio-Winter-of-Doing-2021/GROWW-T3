import mongoose from "mongoose";
require("mongoose-function")(mongoose);

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
    freq: {
        type: Number,
        required: true,
        default: 0,
    },
});

export default mongoose.model("question", questionSchema, "questions");
