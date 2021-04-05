import React, { useEffect, useContext, useState } from "react";
import Options from "../Options/Options";

import AuthContext from "../../../../Contexts/AuthContext";
import UserDataContext from "../../../../Contexts/UserDataContext";

const GeneralOptions = (props) => {
    const logged_in_flag = useContext(AuthContext);
    const user_data = useContext(UserDataContext);

    let currPage = window.location.href.split("/");
    currPage = currPage[currPage.length - 1];
    let parentPage = currPage[currPage.length - 2];

    let stockID = currPage;

    const [showOptions, setShowOptions] = useState(true);

    //Mapping the URL to the NODE_ID
    //For now, the "us-stocks" page is routing to STOCKS because it's node hasn't been implemented
    //in the category tree
    switch (parentPage) {
        case "dashboard":
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
                default:
                    currPage = "DEFAULT";
                    break;
            }
            break;
        case "stocks":
            currPage = "STOCK_SPEC";
            break;
        default:
            currPage = "DEFAULT";
            break;
    }

    const logged_in = logged_in_flag ? "LOGGED_IN" : "NOT_LOGGED_IN";
    const user_id = user_data === null ? null : user_data.user.user_account_id;

    const { setState } = props;

    let options = [];

    useEffect(() => {
        console.log(logged_in_flag);
        fetch(
            "https://groww-chatbot-backend.herokuapp.com/v1/question?page=" +
                currPage +
                "&logged_in=" +
                logged_in +
                "&user_id=" +
                user_id +
                "&stock_id=" +
                stockID +
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

                options.push({
                    name: "Contact us",
                    handler: props.actionProvider.handleContactUs,
                    id: i,
                });

                setState((state) => {
                    return { ...state, options: options };
                });
            });
    }, []);

    return showOptions ? (
        <Options
            options={options}
            title="Options"
            {...props}
            setShowOptions={setShowOptions}
        />
    ) : null;
};
export default GeneralOptions;
