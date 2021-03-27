import React from "react";

import styles from "./Options.module.css";

const Options = ({ options, actionProvider }) => {
    const markup = options.map((option) => (
        <button
            key={option.id}
            className={styles.option}
            onClick={() => {
                option.handler(option);
            }}
        >
            {option.name}
        </button>
    ));

    return <div className={styles.options}>{markup}</div>;
};

export default Options;
