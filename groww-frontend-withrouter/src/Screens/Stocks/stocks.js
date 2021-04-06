import React, {useEffect} from 'react';
import stocksDetails from '../../fixtures/stocks.json';
import StockItem from '../../Components/StockItem/StockItem';
import Classes from './stocks.module.css';

const Stocks = () => {

    let stocks = [];

    useEffect(() => {

        fetch('https://groww-bot-backend.herokuapp.com/v1/stocks')
            .then(r=>r.json())
            .then(data => {
               console.log(data);
               stocks = data;
            });

    });

    return (
        <div className = "container">
            Stocks Page
            <div className = "row">
                {stocksDetails.exploreCompanies.MOST_VALUABLE.map(stock => <StockItem stock={stock} key = {stock.company.isin}/>)}
            </div>
        </div>
    );

}

export default Stocks;