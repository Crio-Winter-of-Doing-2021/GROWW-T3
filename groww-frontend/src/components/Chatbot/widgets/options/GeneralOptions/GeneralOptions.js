import React, { useContext, useEffect } from "react";
import Options from "../Options/Options";
import CurrPageContext from "../../../../../context/CurrPageContext";

const GeneralOptions = (props) => {
    const currPage = useContext(CurrPageContext)[0];

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
