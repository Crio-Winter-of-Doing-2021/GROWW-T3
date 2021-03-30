import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

//All the different screens that are being rendered from the navbar
import FixedDeposits from '../../../Screens/Fixed Deposits/FixedDeposits';
import USStocks from '../../../Screens/US Stocks/us-stocks';
import Stocks from '../../../Screens/Stocks/stocks';
import MutualFunds from '../../../Screens/Mutual Funds/MutualFunds';
import Gold from '../../../Screens/Gold/Gold';
import Orders from '../../../Screens/Orders/Orders';

import Navbar from '../../Navbar/Navbar';
import GrowwChabot from '../../Chatbot/Chatbot';

import growwLogo from '../../../Assets/groww-logo.png';
import Classes from './Dashboard.module.css';

class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            chatbotOn: false
        }
    }

    routes = [

        "stocks", "mutual-funds", "deposits", "gold", "us-stocks", "orders"

    ];

    chatbotToggleHandler = () => {

        console.log("Hello");
        let chatBotOn = this.state.chatbotOn;

        this.setState({
            chatbotOn: !chatBotOn,
        });

    }

    render() {
        return (

            <div>

                <Navbar routes={this.routes}/>

                <Switch>
                    <Route path="/dashboard/stocks" component={Stocks} exact/>
                    <Route path="/dashboard/mutual-funds" component={MutualFunds} exact/>
                    <Route path="/dashboard/deposits" component={FixedDeposits} exact/>
                    <Route path="/dashboard/gold" component={Gold} exact/>
                    <Route path="/dashboard/us-stocks" component={USStocks} exact/>
                    <Route path="/dashboard/orders" component={Orders} exact/>
                </Switch>

                {/*Conditionally render chatbot*/}
                {this.state.chatbotOn ? <GrowwChabot />: null}

                {/*Setting up the chatbot button at the bottom of the site*/}
                <button className={Classes.chatbotToggleBtn} onClick = {this.chatbotToggleHandler}>
                    <img src={growwLogo} alt="Groww Logo" className={Classes.logoStyling}/>
                </button>

            </div>
        );
    }
}

export default Dashboard;
