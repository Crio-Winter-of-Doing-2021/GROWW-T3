import React from "react";

import Classes from "./EmailTextBox.module.css";

const EmailTextbox = ({ actionProvider }) => {
    return (
        <div>
            <input className={Classes.textbox}></input>
            <button
                className={Classes.submitBtn}
                onClick={() => {
                    const message = actionProvider.createChatBotMessage(
                        "We will be contacting you.",
                        { widget: "options" }
                    );
                    actionProvider.addMessageToBotState(message);
                }}
            >
                {">"}
            </button>
        </div>
    );
};

export default EmailTextbox;
