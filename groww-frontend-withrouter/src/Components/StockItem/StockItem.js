import React from 'react';
import Classes from './StockItem.module.css';
import {Link} from "react-router-dom";

const StockItem = ({stock, updChatbot}) => {

    let p = "/dashboard/stocks/" + stock.company.isin;
    return (

        //stock.company.isin
        <div className="col-md-6 col-lg-4 col-xl-3 my-4">
            <div className={`${Classes.crd} card`}>

                <div className={Classes.imgCont}>
                    <img className={`${Classes.imgSize} card-img-top`} src={stock.company.imageUrl} alt="Company Logo"/>
                </div>

                <div className="card-body">
                    <h5 className="card-header">{stock.company.companyName}</h5>
                    <p>LTP: {stock.stats.ltp}</p>
                    <p>HIGH: {stock.stats.high}</p>
                    <p>LOW: {stock.stats.low}</p>
                    <Link to={p} onClick={updChatbot} className = "btn btn-primary"> See More</Link>
                </div>

            </div>
        </div>


    )
}

export default StockItem
