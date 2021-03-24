import React from 'react'
import Chatbot from "react-chatbot-kit";

import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";



const GrowwChatbot = () => {
	return (
		<div style={{
			margin: '40px 0',
			display: 'flex',
			justifyContent: 'center',
			position: 'fixed',
			right: '40px',
			bottom: '40px',
			zIndex: 9999,
			boxShadow: '5px 5px 13px rgba(91, 81, 81, 0.4)',
			borderRadius: '5px'
		}}>
			<Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
		</div>
	)
}

export default GrowwChatbot
