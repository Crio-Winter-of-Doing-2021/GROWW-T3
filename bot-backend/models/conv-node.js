import mongoose from "mongoose";

const Schema = mongoose.Schema;

const convNodeSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    children: {
        type: Array,
        required: true,
    },
    isLeafNode: {
        type: Boolean,
        required: true,
    },
    evalCondition: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: false,
    },
});

export default mongoose.model("conv-node", convNodeSchema, "conv-model");
