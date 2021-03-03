import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import logo from '../../assets/logo.svg';

const Header = () => {

	const [ isLog, toggleIsLog ] = useContext(AuthContext);

	const logToggleHandler = () => {
		toggleIsLog(!isLog);
	}

	return (
		<div className='d-flex justify-content-between align-items-center m-3'>
			<img src={logo} style={{width: '8rem'}} alt="LOGO"/>
			{ isLog ? <button className='btn btn-primary' onClick={logToggleHandler}>Logout</button> : <button className='btn btn-primary'onClick={logToggleHandler}>Login</button> }
		</div>
	)
}

export default Header
