import mutualFundsRouter from "./mutual-fund";
import stocksRouter from "./stocks";

const router = (app) => {
    app.use("/v1/mutual-funds", mutualFundsRouter);
    app.use("/v1/stocks", stocksRouter);
};

export default router;
