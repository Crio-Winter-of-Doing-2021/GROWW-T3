import React, {Component} from 'react';
import Classes from './QA.module.css';

import {Spinner} from 'react-bootstrap';

class QA extends Component{

    constructor(props) {
        super(props);
        this.state = {

            loading: true,
            inputFormDisabled: true,
            categoryTree: null,    //Category Tree retrieved from backend
            formDropDown: null,   //Used to populate the select dropdown form with api data
            selectValues: null,  //Will contain the array of inputs entered by admin
        }
    }

    async componentDidMount() {

        // GET request using fetch with async/await
        const response = await fetch('https://groww-chatbot-backend.herokuapp.com/v1/question/all');
        const data = await response.json();
        console.log(data);
        this.setState({
            ...this.state,
            categoryTree: data,
        });

        console.log(this.state.categoryTree);

        this.loadCategorySelection("root");

    }

    loadCategorySelection(idOfNode){

        let childrenArray = [];
        let categoryTree = this.state.categoryTree;

        for(let i = 0; i<categoryTree.length; i++){
            if(categoryTree[i]["_id"] == idOfNode){
                childrenArray = categoryTree[i]["children"];
            }
        }

        if(childrenArray.length == 0)
            return;

        let newFormDropDown = this.state.formDropDown;
        if( newFormDropDown == null){
            newFormDropDown = document.createElement('div');
        }

        let selectElement = document.createElement("select");
        selectElement.className = "form-select w-50 mt-3";

        for(let i = 0; i<childrenArray.length; i++){

            let newOp = document.createElement("option");
            newOp.value = childrenArray[i];
            newOp.innerHTML = childrenArray[i];

            selectElement.appendChild(newOp);

        }

        newFormDropDown.appendChild(selectElement);

        this.setState({
            ...this.state,
            formDropDown: newFormDropDown,
            loading: false,
        });

        for(let i = 0; i<childrenArray.length; i++){

            this.loadCategorySelection(childrenArray[i]);

        }

    };


    render(){


        function submitQA(){

            let inpVals = [];
            let selectElements = document.getElementsByTagName('select');
            for(let i = 0; i<selectElements.length; i++){

                inpVals.push(selectElements[i].value);

            }

            // this.setState({
            //     ...this.state,
            //     selectValues: inpVals,
            // })

            let enteredQuestion = document.getElementById("ques");
            let enteredAns = document.getElementById("ans");

            console.log(inpVals);
            console.log(enteredQuestion.value);
            console.log(enteredAns.value);

        }

        return(

            <div className = "container">

                <br />
                <p className = {`${Classes.hding} mt-4`}>Choose the category and sub-categories of the FAQ first: </p>


                {
                    this.state.loading ?
                        <Spinner animation = "border" role = "status" />
                        :
                        <div className="content" dangerouslySetInnerHTML={{__html: this.state.formDropDown ? this.state.formDropDown.innerHTML : null}}/>

                }


                <form className = "mt-4 w-50 pt-4 pl-4">

                    <p className = {`${Classes.hding} mt-3`}>Enter the question you want to add: </p>
                    <input id = "ques" type = "text" className = "form-control" disabled = {false}/>

                    <p className = {`${Classes.hding} mt-3`}>Answer: </p>
                    <input id = "ans" type = "text" className = "form-control" disabled = {false}/>

                    <button className = "btn btn-success mt-2" type = "button" onClick={submitQA}>Submit</button>
                </form>

            </div>

        );

    }


}

export default QA;