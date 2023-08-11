import React from 'react';
import logo from '../images/logo.png';
import '../scss/Header.scss';

const Header = () => {
	return (
		<div className='header'>
			<img src={logo} alt='marvel logo' />
		</div>
	);
};

export default Header;
