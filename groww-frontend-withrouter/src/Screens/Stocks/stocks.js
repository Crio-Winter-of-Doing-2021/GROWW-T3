import React, {useEffect, useState} from 'react';
import stocksDetails from '../../fixtures/stocks.json';
import StockItem from '../../Components/StockItem/StockItem';
import Classes from './stocks.module.css';

const Stocks = (props) => {

    const [stocks, setStocks] = useState([]);

    useEffect(() => {

        fetch('https://groww-bot-backend.herokuapp.com/v1/stocks')
            .then(r=>r.json())
            .then(data => {
               console.log(data);
               setStocks(data);
            });

    });

    return (
        <div className = "container">
            Stocks Page
            <div className = "row">
                {stocks ? stocks.map(stock => <StockItem stock={stock} key = {stock.id} updChatbot = {props.updChatbot} />) : null}
            </div>
        </div>
    );

}

export default Stocks;