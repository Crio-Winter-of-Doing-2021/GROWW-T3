import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mutualFundSchema = new Schema({
    id: String,
    scheme_search: String,
    search_id: String,
    category: String,
    sub_category: String,
    sub_sub_category: String,
    aum: Number,
    mean_return: Number,
    return3y: Number,
    return1y: Number,
    min_investment: Number,
    groww_rating: Number,
    risk_rating: Number,
    super_category: String,
    scheme_name: String,
    fund_manager: String,
    fund_house: String,
    scheme_code: String,
    direct_scheme_code: String,
    regular_search_id: String,
    launch_date: String,
    risk: String,
    available_for_investment: Boolean,
    min_sip_investment: Number,
    sip_allowed: Boolean,
    plan_type: String,
    scheme_type: String,
    logo_url: String,
    groww_scheme_code: String,
    expense_ratio: String,
});

export default mongoose.model("mutual-fund", mutualFundSchema, "mutual-funds");
