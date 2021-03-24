import { createChatBotMessage } from "react-chatbot-kit";

let botName = 'GrowwBot';
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
		createChatBotMessage(`Hi, I'm ${botName} 🤖. How may I help you ?`)
	]
}

export default config