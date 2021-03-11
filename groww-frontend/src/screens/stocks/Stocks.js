import React from 'react'
import stocks from '../../fixtures/stocks.json';
import StockItem from './StockItem';

const Stocks = () => {

	console.log(stocks)
	return (

		<div>
			{stocks.exploreCompanies.MOST_VALUABLE.map(stock => <StockItem stock={stock} />)}			
		</div>
	)
}

export default Stocks
