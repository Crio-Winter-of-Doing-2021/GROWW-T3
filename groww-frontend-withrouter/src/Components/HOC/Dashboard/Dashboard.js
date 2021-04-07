import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//All the different screens that are being rendered from the navbar
import FixedDeposits from "../../../Screens/Fixed Deposits/FixedDeposits";
import USStocks from "../../../Screens/US Stocks/us-stocks";
import Stocks from "../../../Screens/Stocks/stocks";
import MutualFunds from "../../../Screens/Mutual Funds/MutualFunds";
import Gold from "../../../Screens/Gold/Gold";
import Orders from "../../../Screens/Orders/Orders";

import Navbar from "../../Navbar/Navbar";
import GrowwChatbot from "../../Chatbot/Chatbot";

import growwLogo from "../../../Assets/groww-logo.png";
import Classes from "./Dashboard.module.css";
import AuthContext from "../../../Contexts/AuthContext";
import UserDataContext from "../../../Contexts/UserDataContext";

import IndividualStockPage from "../../../Screens/Stocks/IndividualStockPage/IndividualStockPage";
import StockItem from "../../StockItem/StockItem";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatbotOn: true,
            userObj: null,
            userLoggedIn: false,
        };
    }

    routes = [
        "stocks",
        "mutual-funds",
        "deposits",
        "gold",
        "us-stocks",
        "orders",
    ];

    chatbotToggleHandler = () => {
        let chatBotOn = this.state.chatbotOn;

        this.setState({
            chatbotOn: !chatBotOn,
        });
    };

    userObjLogin = (user_obj) => {
        console.log(user_obj);
        this.setState({
            ...this.state,
            userObj: user_obj,
        });
    };

    userLoginStatus = (status) => {
        this.setState({
            ...this.state,
            userLoggedIn: status,
        });
    };

    changingRoute = () => {

        this.chatbotToggleHandler();

        setTimeout(() => {
            document.getElementById("chtbtn").click();
        }, 10);

    }

    render() {
        return (
            <AuthContext.Provider value={this.state.userLoggedIn}>
              <UserDataContext.Provider value={this.state.userObj}>
                <div>
                    <Navbar
                        routes={this.routes}
                        userObjLogin={this.userObjLogin}
                        userLoginStatus={this.userLoginStatus}
                        toggleChatbot = {this.changingRoute}
                    />

                        <Switch>
                            <Route
                                path="/dashboard/stocks"
                                // component={Stocks}
                                render = {() => <Stocks updChatbot = {this.changingRoute} />}
                                exact
                            />

                            <Route path = "/dashboard/stocks/:id"
                                   component = {IndividualStockPage}
                                   />
                            <Route
                                path="/dashboard/mutual-funds"
                                component={MutualFunds}
                                exact
                            />
                            <Route
                                path="/dashboard/deposits"
                                component={FixedDeposits}
                                exact
                            />
                            <Route
                                path="/dashboard/gold"
                                component={Gold}
                                exact
                            />
                            <Route
                                path="/dashboard/us-stocks"
                                component={USStocks}
                                exact
                            />
                            <Route
                                path="/dashboard/orders"
                                component={Orders}
                                exact
                            />
                        </Switch>

                        {this.state.chatbotOn ? <GrowwChatbot />: null}

                    {/*Setting up the chatbot button at the bottom of the site*/}
                    <button
                        id = "chtbtn"
                        className={Classes.chatbotToggleBtn}
                        onClick={this.chatbotToggleHandler}
                    >
                        <img
                            src={growwLogo}
                            alt="Groww Logo"
                            className={Classes.logoStyling}
                        />
                    </button>
                </div>
                </UserDataContext.Provider>
            </AuthContext.Provider>
        );
    }
}

export default Dashboard;
