import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import GrowwLogo from "../../../Assets/groww-logo.png";

import GeneralOptions from "../Widgets/General Options/GeneralOptions";

import Classes from "./Config.module.css";

let botName = "GrowwBot";

const config = {
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: "#00C798",
        },
        chatButton: {
            backgroundColor: "#5367FF",
        },
    },
    customComponents: {
        botAvatar: (props) => (
            <img src={GrowwLogo} className={Classes.logoStyle} />
        ),
    },
    initialMessages: [
        createChatBotMessage(`Hi, I'm ${botName} 🤖. How may I help you ?`, {
            widget: "options",
        }),
    ],
    state: {
        options: [],
        logged_in: false,
        currPage: "DEFAULT",
    },
    widgets: [
        {
            widgetName: "options",
            widgetFunc: (props) => <GeneralOptions {...props} />,
            mapStateToProps: ["options"],
        },
    ],
};

export default config;
