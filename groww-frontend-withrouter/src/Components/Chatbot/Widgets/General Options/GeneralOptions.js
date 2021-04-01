import React, { useEffect } from "react";
import Options from "../Options/Options";

const GeneralOptions = (props) => {

    let currPage = window.location.href.split("/");
    currPage = currPage[currPage.length - 1];

    //Mapping the URL to the NODE_ID
    //For now, the "us-stocks" page is routing to STOCKS because it's node hasn't been implemented
    //in the category tree
    switch(currPage){

        case "stocks" : currPage = "STOCKS"
            break;
        case "mutual-funds" : currPage = "MUTUAL_FUNDS"
            break;
        case "deposits" : currPage = "FDS"
            break;
        case "gold" : currPage = "GOLD"
            break;
        case "us-stocks" : currPage = "STOCKS"
            break;
        case "orders" : currPage = "ORDERS"
            break;

    }

    const { setState } = props;

    let options = [];

    useEffect(() => {
        fetch(
            "https://groww-chatbot-backend.herokuapp.com/v1/question?page=" +
            currPage +
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
