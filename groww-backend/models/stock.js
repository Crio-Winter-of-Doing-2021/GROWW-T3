import { Decimal128 } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    company: Object,
    stats: Object,
});

export default mongoose.model("stock", stockSchema, "stocks");
