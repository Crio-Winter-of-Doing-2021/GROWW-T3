import mutualFundsRouter from "./mutual-fund";
import stocksRouter from "./stocks";
import usersRouter from "./users";

const router = (app) => {
    app.use("/v1/mutual-funds", mutualFundsRouter);
    app.use("/v1/stocks", stocksRouter);
    app.use("/v1/user", usersRouter);
};

export default router;
