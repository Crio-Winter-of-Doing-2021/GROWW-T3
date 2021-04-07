import React, { useEffect, useState } from "react";

const IndividualStock = () => {
    const [currStock, setcurrStock] = useState(null);

    useEffect(() => {
        fetch("https://groww-bot-backend.herokuapp.com/v1/stocks")
            .then((r) => r.json())
            .then((data) => {
                console.log(data);

                let currId = window.location.href.split("/");
                currId = currId[currId.length - 1];

                let arrayOfStocks = data;
                for (let i = 0; i < arrayOfStocks.length; i++) {
                    if (arrayOfStocks[i].company.isin === currId) {
                        setcurrStock(arrayOfStocks[i]);
                        break;
                    }
                }
            });
    }, []);

    return (
        <div className="container">
            <img
                className="my-4 mx-4"
                src={currStock ? currStock.company.imageUrl : null}
                alt="company logo"
            />
            {currStock ? currStock.company.companyName : null}
            <p>LTP: {currStock ? currStock.stats.ltp : null}</p>
            <p>HIGH: {currStock ? currStock.stats.high : null}</p>
            <p>LOW: {currStock ? currStock.stats.low : null}</p>
        </div>
    );
};

export default IndividualStock;
