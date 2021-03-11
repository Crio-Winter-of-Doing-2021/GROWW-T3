import React from 'react'

const StockItem = ({ stock }) => {
	return (
		<div className='card my-3 p-3'>	
			<div className="row g-0">
    		<div className="col-md-4 text-center">
      		<img src={stock.company.imageUrl} alt='CompanyLogo' />
    		</div>
    	<div className="col-md-8">
      	<div className="card-body">
        	<h5 className="card-title">{stock.company.companyName}</h5>
        	
        	<p className="card-text"><small className="text-muted">{stock.stats.symbol} | {stock.company.isin}</small></p>
					<div className="card-text d-flex flex-column m-0">
						<p>LTP: {stock.stats.ltp}</p>
						<p>HIGH: {stock.stats.high}</p>
						<p>LOW: {stock.stats.low}</p>
					</div>
      	</div>
			</div>
		</div>
	</div>
	)
}

export default StockItem
