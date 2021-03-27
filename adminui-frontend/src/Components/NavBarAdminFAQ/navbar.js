import React, {Component} from 'react';

import logo from '../../Assets/logo-dark-groww.83f43714.svg';
import Classes from './navbar.module.css';

class navbar extends Component{

    render(){

        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="container">

                    <a className="navbar-brand" href="#"><img src={logo} alt={"Groww Logo"} /></a>

                    <div className={`${Classes.txt} d-flex`}>
                        <span>Admin FAQs</span>
                    </div>

                </div>


            </nav>


        );

    }


}

export default navbar;