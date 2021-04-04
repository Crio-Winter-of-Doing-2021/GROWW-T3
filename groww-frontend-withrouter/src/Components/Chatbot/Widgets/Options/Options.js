import React from "react";

import Classes from "./Options.module.css";

const Options = ({ options, actionProvider, setShowOptions }) => {
    const markup = options.map((option) => (
        <button
            key={option.id}
            className={Classes.option}
            onClick={() => {
                setShowOptions(false);
                option.handler(option);
            }}
        >
            {option.name}
        </button>
    ));

    markup.push(
        <button
            key={options.length}
            className={Classes.option}
            onClick={() => {
                window.open("http://groww.in/help");
            }}
        >
            Explore all FAQs
        </button>
    );

    return <div className={Classes.options}>{markup}</div>;
};

export default Options;
