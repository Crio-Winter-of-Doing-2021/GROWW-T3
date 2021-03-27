import React, { useContext } from "react";
import Chatbot from "react-chatbot-kit";

import config from "./config";
import MessageParser from "./MessageParser";
// import ActionProvider from "./ActionProvider";

import CurrPageContext from "../../context/CurrPageContext";

const GrowwChatbot = ({ selected }) => {
    const currPage = useContext(CurrPageContext);
    class ActionProvider {
        constructor(createChatBotMessage, setStateFunc, createClientMessage) {
            this.createChatBotMessage = createChatBotMessage;
            this.setState = setStateFunc;
            this.createClientMessage = createClientMessage;
        }

        // Helper Function to update state
        addMessageToBotState = (messages, newState) => {
            if (Array.isArray(messages)) {
                this.setState((state) => ({
                    ...state,
                    ...newState,
                    messages: [...state.messages, ...messages],
                }));
            } else {
                this.setState((state) => ({
                    ...state,
                    ...newState,
                    messages: [...state.messages, messages],
                }));
            }
        };

        // Default Response
        handleDefault = () => {
            const message = this.createChatBotMessage(
                "Select one of the questions below or Click on Explore more FAQs.",
                {
                    widget: "options",
                    props: currPage,
                }
            );

            this.addMessageToBotState(message);
        };
    }

    return (
        <div
            style={{
                margin: "40px 0",
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                right: "40px",
                bottom: "40px",
                zIndex: 9999,
                boxShadow: "5px 5px 13px rgba(91, 81, 81, 0.4)",
                borderRadius: "5px",
            }}
        >
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    );
};

export default GrowwChatbot;
