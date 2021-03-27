import React, { useContext, useEffect } from "react";
import styles from "./Options.module.css";
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

    const renderOptions = () => {
        const markup = props.options.map((option) => (
            <button
                key={option.id}
                className={styles.option}
                onClick={() => {
                    const clientMessage = props.actionProvider.createClientMessage(
                        option.name
                    );
                    props.actionProvider.addMessageToBotState(clientMessage);
                    const botMessage = props.actionProvider.createChatBotMessage(
                        option.answer
                    );
                    props.actionProvider.addMessageToBotState(botMessage);
                }}
            >
                {option.name}
            </button>
        ));

        return <div className={styles.options}>{markup}</div>;
    };

    return renderOptions();
};
export default GeneralOptions;
