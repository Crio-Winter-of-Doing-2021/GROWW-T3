import React, {useEffect, useState} from 'react';
import QAnsBox from "../../Components/QAnsBox/QAnsBox";

import Classes from './QuesAnalysis.module.css';

const QuesAnalysis = () => {

    let [questions, setQuestions] = useState([]);

    useEffect(() => {

        fetch('https://groww-chatbot-backend.herokuapp.com/v1/question/all-ques')
            .then(r => r.json())
            .then(data=> {
               console.log(data);
               setQuestions(data);
            });

    }, []);

    return(

        <div className = {`${Classes.ques} container`}>

            {questions.map(i=> <QAnsBox key = {i._id} freq = {i.freq} question = {i.question} answer = {i.answer}/>
            )}

        </div>

    );

}

export default QuesAnalysis;