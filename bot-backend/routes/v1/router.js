import questionsRouter from "./questions";

const router = (app) => {
    app.use("/v1/question", questionsRouter);
};

export default router;
