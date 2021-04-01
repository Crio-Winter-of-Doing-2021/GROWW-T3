import React from "react";

import Classes from "./Options.module.css";

const Options = ({ options, actionProvider }) => {
    const markup = options.map((option) => (
        <button
            key={option.id}
            className={Classes.option}
            onClick={() => {
                option.handler(option);
            }}
        >
            {option.name}
        </button>
    ));

    return <div className={Classes.options}>{markup}</div>;
};

export default Options;
