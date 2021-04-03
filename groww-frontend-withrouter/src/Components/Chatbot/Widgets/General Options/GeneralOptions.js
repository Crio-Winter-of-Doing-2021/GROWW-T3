import React, { useEffect, useContext } from "react";
import Options from "../Options/Options";

import AuthContext from "../../../../Contexts/AuthContext";

const GeneralOptions = (props) => {
    const logged_in_flag = useContext(AuthContext);

    let currPage = window.location.href.split("/");
    currPage = currPage[currPage.length - 1];

    //Mapping the URL to the NODE_ID
    //For now, the "us-stocks" page is routing to STOCKS because it's node hasn't been implemented
    //in the category tree
    switch (currPage) {
        case "stocks":
            currPage = "STOCKS";
            break;
        case "mutual-funds":
            currPage = "MUTUAL_FUNDS";
            break;
        case "deposits":
            currPage = "FDS";
            break;
        case "gold":
            currPage = "GOLD";
            break;
        case "us-stocks":
            currPage = "STOCKS";
            break;
        case "orders":
            currPage = "ORDERS";
            break;
    }

    const logged_in = logged_in_flag ? "LOGGED_IN" : "NOT_LOGGED_IN";

    const { setState } = props;

    let options = [];

    useEffect(() => {
        console.log(logged_in_flag);
        fetch(
            "https://groww-chatbot-backend.herokuapp.com/v1/question?page=" +
                currPage +
                "&logged_in=" +
                logged_in +
                "&start_id=root"
        )
            .then((response) => response.json())
            .then((data) => {
                options = [];
                let i = 0;
                console.log(data);
                data.questions.forEach((ques) => {
                    options.push({
                        name: ques.question,
                        handler: props.actionProvider.handleAnswer,
                        answer: ques.answer,
                        id: i,
                    });
                    i += 1;
                });

                setState((state) => {
                    return { ...state, options: options };
                });
            });
    }, []);

    return <Options options={options} title="Options" {...props} />;
};
export default GeneralOptions;
