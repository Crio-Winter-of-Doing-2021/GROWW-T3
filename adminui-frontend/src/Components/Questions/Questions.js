import React, {Component} from "react";

import QAnsBox from "../QAnsBox/QAnsBox";

import Classes from './Questions.module.css';

class Questions extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const questionsObjArray = [];

        const questionsdb = this.props.questionsDatabase;
        console.log(questionsdb);
        console.log(this.props.questionArray)

        for (let i = 0; i < this.props.questionArray.length; i++) {

            for (let j = 0; j < questionsdb.length; j++) {

                if (questionsdb[j]["_id"] === this.props.questionArray[i]) {

                    questionsObjArray.push(questionsdb[j]);
                    break;

                }

            }

        }

        const QAArray = questionsObjArray.map(i => {
            return <QAnsBox question={i["question"]} answer={i["answer"]}/>
        });

        console.log(questionsObjArray);


        return (

            <div>

                <p className = {Classes.ptxt}>The questions and answers already present for the chosen category are: </p>

                {QAArray.map((component, index) => (<React.Fragment key={index}>
                    {component}
                </React.Fragment>))}

            </div>);

    }
}
export default Questions;