import React, {Component} from 'react';
import Classes from './QA.module.css';

import {Spinner} from 'react-bootstrap';

import Questions from '../Questions/Questions';
import DropDown from '../Dropdowns/dropdowns';

class QA extends Component{

    constructor(props) {
        super(props);
        this.state = {

            loading: true,
            categoryTree: null,    //Category Tree retrieved from backend
            formDropDown: [],   //Used to populate the select dropdown form with api data

            //[ { id: 1, selectedValue: STOCK, options: [ STOCK, MUTUAL_FUND ] } ]

            selectValues: null,  //Will contain the array of inputs entered by admin
            noOfSelects: 0,
            currQuestionsArray: [],    //This array will be sent to the Questions component to load the current questions
            reload:false,

        };
    }

    questionsDatabase = [];    //Contains all the questions
    questionsObjects = [];   //Temporary

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

        this.questionsObjects = [];
        this.questionsDatabase = [];

        for(let i = 0; i<data.length; i++){

            for(let j=0; j<data[i]["questions"].length; j++){
                this.questionsObjects.push(data[i]["questions"][j]);
            }

        }

        for(let i=0; i<this.questionsObjects.length; i++){

            const response = await fetch('https://groww-chatbot-backend.herokuapp.com/v1/question/' + this.questionsObjects[i]);
            const data = await response.json();
            this.questionsDatabase.push(data);

        }

        console.log(this.questionsDatabase);

        let newDropDownsList = [];

        newDropDownsList =  this.loadCategorySelection("root", this.state.categoryTree[0]["children"][0], newDropDownsList, 0);

        //Setting up the Questions for the first time
        let lastSelected = newDropDownsList[newDropDownsList.length - 1]["selected"];

        let newQuestionsArray = [];

        for(let i= 0; i<this.state.categoryTree.length; i++){

            if(lastSelected === this.state.categoryTree[i]["_id"]){
                newQuestionsArray = this.state.categoryTree[i]["questions"];
            }

        }


        //console.log(newDropDownsList);
        this.setState({
            ...this.state,
            formDropDown: newDropDownsList,
            loading: false,
            noOfSelects: 1,
            currQuestionsArray: newQuestionsArray,
        });

    }


    loadCategorySelection(idOfNode, selectedValue, arrayDropDowns, idOfNewDropDown){

        let childrenArray = [];
        let categoryTree = this.state.categoryTree;
        let evalCond = null;

        for(let i = 0; i<categoryTree.length; i++){
            if(categoryTree[i]["_id"] === idOfNode){
                childrenArray = categoryTree[i]["children"];
                evalCond = categoryTree[i]["evalCondition"];
            }
        }

        //console.log(childrenArray);
        if(childrenArray.length === 0)
            return;

        let newDropDown = arrayDropDowns;

        let thisDropDownData = {};
        thisDropDownData['id'] = idOfNewDropDown+1;
        thisDropDownData['selected'] = selectedValue == null ? childrenArray[0] : selectedValue;
        thisDropDownData['options'] = [];
        thisDropDownData['evalCondition'] = evalCond;

        for(let i = 0; i<childrenArray.length; i++){
            thisDropDownData['options'].push(childrenArray[i]);
        }

        newDropDown.push(thisDropDownData);

        //console.log(newDropDown);
        return newDropDown;

    };

    handleClick = () => {

        //console.log("Hello");

        let selects = document.getElementsByTagName("select");

        let selectedValues = [];

        for(let i = 0; i<selects.length; i++){
            selectedValues.push(selects[i].value);
        }
        //Now, we have all the selected Values

        let newFormDropDown = [];

        newFormDropDown =  this.loadCategorySelection("root",  selectedValues[0],newFormDropDown, 0);

        for(let i=0; i<selectedValues.length; i++){

            if(i<selectedValues.length-1)
                this.loadCategorySelection(selectedValues[i], selectedValues[i+1],newFormDropDown, i+1);
            else
                this.loadCategorySelection(selectedValues[i], null,newFormDropDown, i+1);

            // console.log(newFormDropDown);

        }

        console.log(newFormDropDown);

        //Questions array are obtained for the leaf node of the tree
        //Which is the last selected option
        let lastSelected = newFormDropDown[newFormDropDown.length - 1]["selected"];

        let newQuestionsArray = [];

        for(let i= 0; i<this.state.categoryTree.length; i++){

            if(lastSelected === this.state.categoryTree[i]["_id"]){

                newQuestionsArray = this.state.categoryTree[i]["questions"];

            }

        }

        this.setState({
            ...this.state,
            formDropDown: newFormDropDown,
            noOfSelects: newFormDropDown.length,
            currQuestionsArray: newQuestionsArray,
        });

        console.log(this.state.formDropDown);
        console.log(this.state.currQuestionsArray);


    }


    submitQA = () => {

        let enteredQuestion = document.getElementById("ques");
        let enteredAns = document.getElementById("ans");

        let selectedNode = this.state.formDropDown[this.state.formDropDown.length-1]["selected"];

        console.log(enteredQuestion.value);
        console.log(enteredAns.value);
        console.log(selectedNode);

        fetch('https://groww-chatbot-backend.herokuapp.com/v1/question/', {
            method: 'POST', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            }, body: JSON.stringify({

                question: enteredQuestion.value, answer: enteredAns.value, node_id: selectedNode,

            })
        }).then(r => r.json())
            .then(data => {
                console.log(data);


                //Adding the questions in the database, as well as the current node array
                this.questionsDatabase.push(data);
                let newcurrQuestionsArray = this.state.currQuestionsArray;

                newcurrQuestionsArray.push(data["_id"]);
                this.setState({
                    ...this.state,
                    currQuestionsArray: newcurrQuestionsArray,
                });

            })

    }

    render(){

        const handleClick = this.handleClick;
        const submitQA = this.submitQA;

        //Array of DropD own components
        const dropdownsArray = this.state.formDropDown.map( i => {
            //console.log(this.state.formDropDown);
            return <DropDown key ={i['id']}  id = {i['id']} selectedValue = {i['selected']} options = {i['options']} evalCond = {i['evalCondition']} onClickHandler = {handleClick}/>
        });

        return(

            <div className = {Classes.bigContainer}>

                <br />
                <p className = {`${Classes.hding} mt-4`}>Choose the category and sub-categories of the FAQ first: </p>


                {
                    this.state.loading ?
                        <Spinner animation = "border" role = "status" />
                        :
                        dropdownsArray.map((component, index) => (
                            <React.Fragment key={index}>
                                { component }
                            </React.Fragment>
                        ))

                }


                <Questions questionsDatabase = {this.questionsDatabase} questionArray = {this.state.currQuestionsArray}/>

                {/*This is the form*/}
                <div>
                        <form className = "mt-4 w-50 pt-4 pl-4">

                            <p className = {`${Classes.hding} mt-3`}>Enter the question you want to add: </p>
                            <input id = "ques" type = "text" className = "form-control" disabled = {false}/>

                            <p className = {`${Classes.hding} mt-3`}>Answer: </p>
                            <input id = "ans" type = "text" className = "form-control" disabled = {false}/>

                            <button className = "btn btn-success mt-2" type = "button" onClick={submitQA}>Submit</button>
                        </form>
                    </div>

                    <div className = {Classes.decoratorsList}>

                        <button className="btn btn-primary" type="button" data-toggle="collapse"
                                data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Decorators List
                        </button>


                        <div className={`collapse ${Classes.decorators}`} id="collapseExample">
                            <div className="card card-body">

                                <pre>
                                <h2>User</h2>

                                user.user_id<br />

                                user.user_account_id<br />

                                user.bse_user_id<br />

                                user.bse_mandate_id<br />

                                user.fno_status<br />

                                user.first_name<br />

                                user.last_name<br />

                                user.email_id<br />

                                user.mobile_number<br />

                                user.country_code<br />

                                user.enabled<br />

                                user.bse_enabled<br />

                                user.mandate_id_linked<br />

                                user.bse_fatca<br />

                                user.email_verified<br />

                                user.has_invitation<br />

                                user.mobile_verified<br />

                                user.aof_enabled<br />

                                user.gmail_user<br />

                                user.connection_imported<br />

                                user.aof_status<br />

                                user.kyc_status<br />

                                user.kyc_details<br />

                                user.onboarding_status<br />

                                user.investment_status<br />

                                user.investment_event_sent<br />

                                user.image_url<br />

                                user.search_id<br />

                                user.description<br />

                                user.author_is_user<br />

                                user.is_kyc_verified<br />

                                user.is_expert <br />

                                user.is_direct_plan <br />

                                user.is_suspended <br />

                                user.blocked_accounts_info.wallet <br />

                                user.blocked_accounts_info.mutualFund <br />

                                user.blocked_accounts_info.stocks <br />

                                user.user_role <br />

                                user.tags <br />

                                user.created_at <br />

                                user.kyc_mode <br />

                                user.utm_source <br />

                                user.utm_medium <br />

                                user.utm_campaign <br />

                                user.utm_ref_code <br />

                                user.super_user_account_id <br />

                                user.is_child_user <br />

                                user.google_account <br />

                                user.stocks_status <br />

                                user.is_stocks_invited <br />

                                user.groww_kyc_status <br />

                                user.demat_account_status <br />

                                <h2>Stock</h2>

                                stock.company.isin <br />

                                stock.company.companyName <br />

                                stock.company.searchId <br />

                                stock.company.nseScriptCode <br />

                                stock.company.companyShortName <br />

                                stock.company.bseScriptCode <br />

                                stock.company.bseScriptGroup <br />

                                stock.company.imageUrl <br />

                                stock.stats.type <br />

                                stock.stats.symbol <br />

                                stock.stats.tsInMillis <br />

                                stock.stats.open <br />

                                stock.stats.high <br />

                                stock.stats.low <br />

                                stock.stats.close <br />

                                stock.stats.ltp <br />

                                stock.stats.dayChange <br />

                                stock.stats.dayChangePerc <br />

                                stock.stats.lowPriceRange <br />

                                stock.stats.highPriceRange <br />

                                stock.stats.volume <br />

                                stock.stats.marketCap <br />

                                stock.stats.totalBuyQty <br />

                                stock.stats.totalSellQty <br />

                                </pre>

                            </div>
                        </div>

                    </div>

            </div>

        );

    }


}

export default QA;