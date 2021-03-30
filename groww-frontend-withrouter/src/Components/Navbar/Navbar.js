import React, { Component } from 'react';
import BrandLogo from '../../Assets/logo-dark-groww.83f43714.svg';

import {Link} from 'react-router-dom';

import Classes from './Navbar.module.css';

class Navbar extends Component{

    constructor(props){
        super(props);
    }

    //The routes are received as props
   routes = this.props.routes;


    render(){

        //console.log(window.location.href);

        let activeElement = window.location.href.split("/");
        //console.log(activeElement);

        //The node that the current url is on
        activeElement = activeElement[activeElement.length-1];
        //console.log(activeElement);

        //This array contains an active value for the element that will be the active tab
        //for the current url, otherwise the value will be ""
        let activeClassArray = [];
        for(let i=0; i<this.routes.length; i++){

            if(this.routes[i] === activeElement){
                activeClassArray.push("active")
            }else{
                activeClassArray.push("");
            }

        }

        //The i variable is used to traverse through the array and assign the different active values
        let i = 0;

        return(
          <div>

              <nav className = "navbar">

                  <div className="container-fluid">

                      {/*Line of navbar with the logo login thing*/}
                      <div className="navbar-brand">
                          <img src = {BrandLogo} alt="Groww" className = {Classes.logoConfig}/>
                      </div>

                      {/*This is the line of the navbar to the different tags to navigate between the pages*/}

                  </div>

                  {/*Adding the different links of the navbar*/}
                  <div className = {`${Classes.tabsConfig}`}>

                      <ul className="nav nav-tabs">
                          <li className="nav-item">
                              <Link to = "/dashboard/stocks" className={`${activeClassArray[i++]} ${Classes.linksConfig} nav-link`}>Stocks</Link>
                          </li>
                          <li className="nav-item">
                              <Link to = "/dashboard/mutual-funds" className={`${activeClassArray[i++]} ${Classes.linksConfig} nav-link`}>Mutual Funds</Link>
                          </li>
                          <li className="nav-item">
                              <Link to = "/dashboard/deposits" className={`${activeClassArray[i++]} ${Classes.linksConfig} nav-link`}>Fixed Deposits</Link>
                          </li>
                          <li className="nav-item">
                              <Link to = "/dashboard/gold" className={`${activeClassArray[i++]} ${Classes.linksConfig} nav-link`}>Gold</Link>
                          </li>
                          <li className="nav-item">
                              <Link to = "/dashboard/us-stocks" className={`${activeClassArray[i++]} ${Classes.linksConfig} nav-link`}>US Stocks</Link>
                          </li>
                          <li className="nav-item">
                              <Link to = "/dashboard/orders" className={`${activeClassArray[i++]} ${Classes.linksConfig} nav-link`}>Orders</Link>
                          </li>

                      </ul>

                  </div>


              </nav>


          </div>
        );

    }

}

export default Navbar;