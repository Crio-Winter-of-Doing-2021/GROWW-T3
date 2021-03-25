import { createChatBotMessage } from "react-chatbot-kit";
import GeneralOptions from "./widgets/options/GeneralOptions/GeneralOptions";

let botName = "GrowwBot";
const config = {
    botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: "#00C798",
        },
        chatButton: {
            backgroundColor: "#5367FF",
        },
    },
    initialMessages: [
        createChatBotMessage(`Hi, I'm ${botName} 🤖. How may I help you ?`, {
            widget: "options",
        }),
    ],
    widgets: [
        {
            widgetName: "options",
            widgetFunc: (props) => <GeneralOptions {...props} />,
        },
    ],
};

export default config;
