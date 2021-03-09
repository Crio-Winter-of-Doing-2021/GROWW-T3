import mongoose from "mongoose";

const Schema = mongoose.Schema;

const convNodeSchema = new Schema({
    _id: String,
    children: Array,
    isLeafNode: Boolean,
    evalCondition: String,
    questions: Array,
});

export default mongoose.model("conv-node", convNodeSchema, "conv-model");
