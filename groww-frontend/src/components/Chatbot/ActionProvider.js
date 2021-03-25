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
            }
        );

        this.addMessageToBotState(message);
    };
}

export default ActionProvider;
