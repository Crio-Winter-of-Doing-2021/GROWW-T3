import React from 'react';

import Classes from './QAnsBox.module.css';

const qabox = (props) => {

    let headerEle = null;

    let freq = props.freq;
    if(freq!==undefined && !freq.isNaN){
        headerEle = (
            <div className = "card-header">
                Frequency : {freq}
            </div>
        )
    }

    return (
        <div className={`card ${Classes.qacss}`}>
            {headerEle}
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{props.question}</h6>
                <p className="card-text">{props.answer}</p>
            </div>
        </div>
    );
}

export default qabox;