import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Classes from './LandingPage.module.css';

class LandingPage extends  Component{

    render(){
        return(
            <div>
                <div className='m-5 p-5'>
                    <h1>Welcome to Groww.</h1>
                    <p>Invest in Stocks, FDs, Mutual Funds, US stocks, Golds and more.</p>
                    <Link to = "/dashboard/stocks" className='btn btn-primary'>Get Started</Link>
                </div>

            </div>
        );
    }

}

export default LandingPage;