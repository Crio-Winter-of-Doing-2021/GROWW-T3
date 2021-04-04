import React from 'react';
import Chatbot from 'react-chatbot-kit';

import Config from './Config/Config';
import MessageParser from './Message Parser/messageParser';
import ActionProvider from './Action Provider/actionProvider';

import Classes from './Chatbot.module.css';

const growwChatbot = (props) => {

    const saveMessages = (messages) => {
        console.log(messages);

        for(let i=0; i<messages.length-1; i++){

            if(messages[i]['widget']){
                messages[i]['widget'] = null;
            }

        }

        sessionStorage.setItem("chat_messages", JSON.stringify(messages));
    };

    const loadMessages = () => {
        const messages = JSON.parse(sessionStorage.getItem("chat_messages"));
        return messages;
    };

    return (
      <div className = {Classes.chatBotStyling}>
        <Chatbot config = {Config} messageParser = {MessageParser}
                 actionProvider = {ActionProvider}
                saveMessages = {saveMessages}
                messageHistory = {loadMessages()}/>
      </div>
    );

}

export default growwChatbot;