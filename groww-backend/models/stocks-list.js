import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stocksListSchema = new Schema({
    company: Object,
    stats: Object,
});

export default mongoose.model("stocks-list", stocksListSchema, "stocks-list");
