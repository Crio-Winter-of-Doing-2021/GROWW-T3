import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stocksListSchema = new Schema({
    exploreCompanies: Object,
    count: Number,
});

export default mongoose.model("stocks-list", stocksListSchema, "stocks-list");
