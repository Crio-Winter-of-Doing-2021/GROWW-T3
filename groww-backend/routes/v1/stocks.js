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

// @route   GET v1/stocks/:id
// @desc    Get all available stocks
// @access  Public
router.get("/:id", (req, res) => {
    StocksList.findOne({ "company.isin": req.params.id })
        .then((stock) => {
            res.status(200).json(stock);
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

export default router;
