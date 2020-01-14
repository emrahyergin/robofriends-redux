import React from 'react';

const Scroll = (props) => {
	return (
		<div style={{ overflowY: 'scroll', border: '5px solid black', height: '500px' }}>
			{props.children}
		</div>
	);
};

export default Scroll;


// state, props and children:
// Scroll object will wrap CardList object
// in order to have our searchbox at the top
// while scrolling down. If Scroll will
// act as a parent and CardList as its
// children one can manage to do that.