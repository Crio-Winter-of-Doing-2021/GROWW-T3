import express from "express";
import request from "request";

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
        answer: new Function("page", "user", answer),
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
// @desc    Get All questions
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

// @route   GET v1/question/:id
// @desc    Get question by id
// @access  Public
router.get("/:id", (req, res) => [
    Question.findOne({ _id: req.params.id })
        .then((question) => res.status(200).json(question))
        .catch((err) =>
            res.status(400).json({
                error: "Some Error Occured : " + err,
            })
        ),
]);

// @route   GET v1/question/conv-node/:id
// @desc    Get conv node by id
// @access  Public
router.get("/conv-node/:id", (req, res) => [
    ConvNode.findOne({ _id: req.params.id })
        .then((node) => res.status(200).json(node))
        .catch((err) =>
            res.status(400).json({
                error: "Some Error Occured : " + err,
            })
        ),
]);

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
                                    _id: ques._id,
                                    question: ques.question,
                                    answer: ques.answer(page, user),
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

    const load_user = async () => {
        if (logged_in === "LOGGED_IN") {
            await request(
                "https://groww-bot-backend.herokuapp.com/v1/user/" +
                    user_account_id,
                (err, res, body) => {
                    body = JSON.parse(body);
                    user = body.data.user;
                }
            );
        }
    };

    const load_stock = async () => {
        if (page === "STOCK_SPEC") {
            await request(
                "https://groww-bot-backend.herokuapp.com/v1/stocks/" + stock_id,
                (err, res, body) => {
                    body = JSON.parse(body);
                    stock = body.data.stock;
                }
            );
        }
    };

    const load_all_data = async () => {
        await load_stock();
        await load_user();
        await getLeaf(start_id);
    };

    load_all_data();
});

export default router;
