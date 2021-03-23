import express from "express";

import Question from "../../models/question";
import ConvNode from "../../models/conv-node";
import question from "../../models/question";

const router = express.Router();

// @route   POST v1/question
// @desc    Post a new question
// @access  Public
router.post("/", (req, res) => {
    Question.create({
        question: "How are you?",
        answer: () => {
            return "Good";
        },
    })
        .then((ques) => {
            res.status(200).json(ques);
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

// @route   GET v1/question
// @desc    Get questions
// @access  Public
router.get("/", (req, res) => {
    const start_id = req.query.start_id;
    const page = req.query.page;

    const getLeaf = (id) => {
        ConvNode.findOne({ _id: id })
            .then((node) => {
                if (node == null) {
                    res.status(404).json({
                        error: "No Node with id '" + id + "'found",
                    });
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
                                    answer: ques.answer(),
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

    getLeaf(start_id);
});

export default router;
