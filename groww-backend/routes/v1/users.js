import express from "express";

import User from "../../models/user";
import UserAuth from "../../models/user-auth";

const router = express.Router();

// @route   POST v1/user/login
// @desc    Login and get user id
// @access  Public
router.post("/login", (req, res) => {
    UserAuth.findOne({
        email_id: req.body.email_id,
        password: req.body.password,
    })
        .then((user) => {
            if (user == null) res.status(404).json({ error: "User not found" });
            else {
                res.status(200).json({ user_account_id: user.user_account_id });
            }
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

// @route   GET v1/user/:id
// @desc    GET user using user_account_id
// @access  Public
router.get("/:id", (req, res) => {
    User.findOne({ user_account_id: req.params.id })
        .then((user) => {
            if (user == null) res.status(404).json({ error: "User not found" });
            else {
                res.status(200).json({
                    response: "success",
                    data: {
                        response: "success",
                        attributes: null,
                        user: user,
                    },
                });
            }
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

export default router;
