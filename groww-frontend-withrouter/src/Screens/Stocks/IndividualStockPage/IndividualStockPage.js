import React from 'react';
import stockDetails from '../../../fixtures/stocks.json';
import stocksDetails from "../../../fixtures/stocks.json";

const individualStock = (props) => {

    let currId = window.location.href.split("/");
    currId = currId[currId.length - 1];

    let arrayOfStocks = stocksDetails.exploreCompanies.MOST_VALUABLE;
    let currStock;
    for (let i = 0; i < arrayOfStocks.length; i++) {

        if (arrayOfStocks[i].company.isin == currId) {
            currStock = arrayOfStocks[i];
        }

    }

    return (

        <div className = "container">
            <img className = "my-4 mx-4" src = {currStock.company.imageUrl} alt = "company logo"/>
            {currStock.company.companyName}
            <p>LTP: {currStock.stats.ltp}</p>
            <p>HIGH: {currStock.stats.high}</p>
            <p>LOW: {currStock.stats.low}</p>
        </div>

    );

}

export default individualStock;