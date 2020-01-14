import React from 'react';
import CardList from '../components/CardList';
// import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


class App extends React.Component {
	constructor() {
		super()
		this.state = {
			// robots.js file can be used for this as well,
			// in order not to trigger the last step of 
			// Component Lifecycle (componentDidMount):
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	// Anytime making own methods on a Component, use arrow functions.
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		// with destructuring the repetitive this.state
		// might be avoided for a much cleaner code:
		const { robots, searchfield } = this.state; 
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		if (!robots.length) {
			return <h3 className='f1 tc'>Loading</h3>
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;


// STATE
// is used to communicate Parent with the child:
// Simply means the description of your Application
// Is able to change, dynamic.
// Props are simply things that come out of state
// A parent feeds STATE into a child component
// The state that a child component receives 
// is a PROPS. The child cannot change it.
