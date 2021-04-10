import express from "express";
import fetch from "node-fetch";

import Question from "../../models/question";
import ConvNode from "../../models/conv-node";

const router = express.Router();

// @route   POST v1/question
// @desc    Post a new question
// @access  Public
router.post("/", (req, res) => {
    const answer = "return '" + req.body.answer + "'";
    Question.create({
        question: req.body.question,
        answer: new Function("page", "user", "stock", answer),
    })
        .then((ques) => {
            ConvNode.findOneAndUpdate(
                { _id: req.body.node_id },
                { $addToSet: { questions: [ques._id] } }
            )
                .then(() => res.status(200).json(ques))
                .catch((err) =>
                    res.status(400).json({
                        error: "Some Error Occured : " + err,
                    })
                );
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

// @route   GET v1/question/all
// @desc    Get All nodes
// @access  Public
router.get("/all", (req, res) => {
    ConvNode.find()
        .then((nodes) => res.status(200).json(nodes))
        .catch((err) =>
            res.status(400).json({
                error: "Some Error Occured : " + err,
            })
        );
});

// @route   GET v1/question/all-ques
// @desc    Get All questions
// @access  Public
router.get("/all-ques", (req, res) => {
    Question.find()
        .then((ques) => res.status(200).json(ques))
        .catch((err) =>
            res.status(400).json({
                error: "Some Error Occured : " + err,
            })
        );
});

// @route   GET v1/question/:id
// @desc    Get question by id
// @access  Public
router.get("/:id", (req, res) => {
    Question.findOne({ _id: req.params.id })
        .then((question) => res.status(200).json(question))
        .catch((err) =>
            res.status(400).json({
                error: "Some Error Occured : " + err,
            })
        );
});

// @route   GET v1/question/conv-node/:id
// @desc    Get conv node by id
// @access  Public
router.get("/conv-node/:id", (req, res) => {
    ConvNode.findOne({ _id: req.params.id })
        .then((node) => res.status(200).json(node))
        .catch((err) =>
            res.status(400).json({
                error: "Some Error Occured : " + err,
            })
        );
});

// @route   POST v1/question/freq/:id
// @desc    Update question freq
// @access  Public
router.post("/freq/:id", (req, res) => {
    Question.updateOne({ _id: req.params.id }, { $inc: { freq: 1 } })
        .then((node) => res.status(200).json(node))
        .catch((err) =>
            res.status(400).json({
                error: "Some Error Occured : " + err,
            })
        );
});

// @route   GET v1/question
// @desc    Get questions
// @access  Public
router.get("/", (req, res) => {
    const start_id = req.query.start_id;
    const page = req.query.page;
    const logged_in = req.query.logged_in;
    const user_account_id = req.query.user_id;
    const stock_id = req.query.stock_id;

    // Hit Grooww backend to get user object
    let user = null;
    let stock = null;

    const getLeaf = (id) => {
        console.log("Getting Node...");
        console.log(id);
        ConvNode.findOne({ _id: id })
            .then((node) => {
                if (node == null) {
                    getLeaf("DEFAULT");
                } else if (node.isLeafNode) {
                    Question.find({
                        _id: { $in: node.questions },
                    })
                        .then((questions) => {
                            node.questions = [];
                            questions.forEach((ques) => {
                                let question = {
                                    ques_id: ques._id,
                                    question: ques.question,
                                    answer: ques.answer(page, user, stock),
                                };
                                node.questions.push(question);
                            });
                            res.status(200).json(node);
                        })
                        .catch((err) => {
                            res.status(400).json({
                                error: "Some Error Occured : " + err,
                            });
                        });
                } else {
                    getLeaf(eval(node.evalCondition));
                }
            })
            .catch((err) =>
                res.status(400).json({ error: "Some Error Occured : " + err })
            );
    };

    const load_user = () => {
        console.log("Loading User...");
        if (logged_in === "LOGGED_IN") {
            fetch(
                "https://groww-bot-backend.herokuapp.com/v1/user/" +
                    user_account_id
            )
                .then((data) => data.json())
                .then((data) => {
                    user = data.data.user;
                    getLeaf(start_id);
                });
        } else {
            getLeaf(start_id);
        }
    };

    const load_stock = async () => {
        console.log("Loading Stock...");
        if (page === "STOCK_SPEC") {
            fetch(
                "https://groww-bot-backend.herokuapp.com/v1/stocks/" + stock_id
            )
                .then((data) => data.json())
                .then((data) => {
                    stock = data;
                    load_user();
                });
        } else {
            load_user();
        }
    };

    const load_all_data = () => {
        load_stock();
    };

    load_all_data();
});

export default router;
