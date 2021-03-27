import React from "react";
import TabNav from "../../components/TabNav/TabNav";
import Tab from "../../components/Tab/Tab";
import * as TabNames from "../../utils/Tabs";
import Stocks from "../stocks/Stocks";
import CurrPageContext from "../../context/CurrPageContext";

const Main = () => {
    return (
        <CurrPageContext.Consumer>
            {(value) => {
                const selected = value[0];
                const setSelected = value[1];
                return (
                    <div>
                        <TabNav
                            tabs={[
                                TabNames.STOCKS,
                                TabNames.MUTUAL_FUNDS,
                                TabNames.GOLD,
                                TabNames.FDS,
                                TabNames.ORDERS,
                            ]}
                            selected={selected}
                            setSelected={setSelected}
                        >
                            <Tab isSelected={selected === TabNames.STOCKS}>
                                <Stocks />
                            </Tab>
                            <Tab
                                isSelected={selected === TabNames.MUTUAL_FUNDS}
                            >
                                <p>Mutual funds</p>
                            </Tab>
                            <Tab isSelected={selected === TabNames.GOLD}>
                                <ul>
                                    <li>List test 1</li>
                                    <li>List test 2</li>
                                    <li>List test 3</li>
                                </ul>
                            </Tab>
                            <Tab isSelected={selected === TabNames.FDS}>
                                <ul>
                                    <li>List test 1</li>
                                </ul>
                            </Tab>
                            <Tab isSelected={selected === TabNames.ORDERS}>
                                <p>Your orders</p>
                            </Tab>
                        </TabNav>
                    </div>
                );
            }}
        </CurrPageContext.Consumer>
    );
};

export default Main;
