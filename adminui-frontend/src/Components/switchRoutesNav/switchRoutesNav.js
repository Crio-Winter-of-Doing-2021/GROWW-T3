import React from 'react';
import Classes from './switchRoutesNav.module.css';
import {Link} from "react-router-dom";

const NavRoutes= () => {

    return(

        <div className ={Classes.switchNav}>

            <div className ={Classes.op1}>
                <Link to = "/" > <span className={Classes.linkRoute}> Add Questions </span></Link>
            </div>

            <div className ={Classes.op2}>
                <Link to = "data-analysis"> <span className={Classes.linkRoute}>Data Analysis </span></Link>
            </div>

        </div>

    );

}

export default NavRoutes;