import React from 'react';
import stocksDetails from '../../fixtures/stocks.json';
import StockItem from '../../Components/StockItem/StockItem';
import Classes from './stocks.module.css';

function Stocks(){

    return (
        <div className = "container">
            Stocks Page
            <div className = "row">
                {stocksDetails.exploreCompanies.MOST_VALUABLE.map(stock => <StockItem stock={stock} />)}
            </div>
        </div>
    )

}

export default Stocks;