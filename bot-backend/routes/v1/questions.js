import express from "express";

import Question from "../../models/question";
import ConvNode from "../../models/conv-node";

const router = express.Router();

// @route   POST v1/question
// @desc    Post a new question
// @access  Public
router.post("/", (req, res) => {
    const answer = "return '" + req.body.answer + "'";
    console.log(answer);
    Question.create({
        question: req.body.question,
        answer: new Function("page", answer),
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

// @route   GET v1/question?start_id=''&page=''&logged_in='
// @desc    Get questions
// @access  Public
router.get("/", (req, res) => {
    const start_id = req.query.start_id;
    const page = req.query.page;
    const logged_in = "LOGGED_IN";

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
                                    answer: ques.answer(page),
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

// @route   POST v1/question?node_id=''&ques_id=''
// @desc    Post a new question
// @access  Public
router.delete("/", (req, res) => {
    const node_id = req.query.node_id;
    const ques_id = req.query.ques_id;

    ConvNode.updateOne({ _id: node_id }, { $pullAll: ques_id })
        .then(() => {
            Question.deleteOne({ _id: ques_id })
                .then(() => {
                    res.status(200).json({ status: "Delete Successful" });
                })
                .catch((err) =>
                    res
                        .status(400)
                        .json({ error: "Some Error Occured : " + err })
                );
        })
        .catch((err) =>
            res.status(400).json({ error: "Some Error Occured : " + err })
        );
});

export default router;
