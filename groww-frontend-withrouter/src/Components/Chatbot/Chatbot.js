import React from 'react';
import Chatbot from 'react-chatbot-kit';

import Config from './Config/Config';
import MessageParser from './Message Parser/messageParser';
import ActionProvider from './Action Provider/actionProvider';

import Classes from './Chatbot.module.css';

const growwChatbot = (props) => {

    return (
      <div className = {Classes.chatBotStyling}>
        <Chatbot config = {Config} messageParser = {MessageParser} actionProvider = {ActionProvider}/>
      </div>
    );

}

export default growwChatbot;