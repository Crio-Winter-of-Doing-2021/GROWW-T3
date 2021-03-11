import React  from 'react'

const Tabs = ({ tabs, selected, setSelected, children }) => {

	return (
		<div>
			<ul className='nav nav-tabs'>
				{
					tabs.map(tab => {
						const active = (tab === selected ? 'active' : '');

						return (
							<li className='nav-item' key={tab}>
								<div role='button' className={'nav-link ' + active} onClick={() => setSelected(tab)}>
									{ tab }
								</div>
							</li>
						);
					})
				}
			</ul>			
			{children}
		</div>
	)
}

export default Tabs
