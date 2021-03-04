import React from 'react'

const Tab = (props) => {
	
	if(props.isSelected) return <>{props.children}</>;
	
	return null;
}

export default Tab
