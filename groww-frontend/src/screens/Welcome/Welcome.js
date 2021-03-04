import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';

const Welcome = () => {

	const [ isLog, toggleIsLog ] = useContext(AuthContext);


	const logToggleHandler = () => {
		toggleIsLog(!isLog);
	}


	return (
		<div className='my-5 py-5'>
			<h1>Welcome to Groww.</h1>	
			<p>Invest in Stocks, FDs, Mutual Funds, US stocks, Golds and more.</p>
			<button className='btn btn-primary' onClick={logToggleHandler}>Get Started</button>
		</div>
	)
}

export default Welcome
