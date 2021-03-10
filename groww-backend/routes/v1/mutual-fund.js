import express from "express";

import MutualFund from "../../models/mutual-fund";

const router = express.Router();

// @route   GET v1/mutual-fund
// @desc    Get all available mutual funds
// @access  Public
router.get("/", (req, res) => {
    MutualFund.find()
        .then((mfs) => {
            res.status(200).json(mfs);
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

// @route   GET v1/mutual-fund
// @desc    Get all available mutual funds
// @access  Public
router.post("/", (req, res) => {
    console.log();
    const mf = new MutualFund(req.body);
    mf.save()
        .then((mf) => {
            res.status(200).json(mf);
        })
        .catch((err) => {
            res.status(400).json({ error: "Some Error Occured : " + err });
        });
});

export default router;
