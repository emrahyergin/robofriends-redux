import React from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../redux_actions';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import './App.css';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends React.Component {
	componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { robots, searchField, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
		return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          { isPending ? <h1>Loading</h1> :
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          }
        </Scroll>
      </div>
    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// Redux is a library for state management.
// first create constants that will trigger the actions,
// then create reducers that will parse these actions that
// will create different states accordingly.
// Pass these states into the app trough {connect} with
// mapStateToProps and mapDispatchToProps.

// within the index.js file create reducers and stores
// for the ReactDOM object which will render and provide
// all defined states, sustained with logs and middleware.