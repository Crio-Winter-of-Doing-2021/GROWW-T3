import express from "express";
import fs from "fs";

import StocksList from "../../models/stocks-list";

const router = express.Router();

// @route   GET v1/stocks
// @desc    Get all available stocks
// @access  Public
router.get("/", (req, res) => {
    StocksList.find()
        .then((stocks) => {
            res.status(200).json(stocks);
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

export default router;
