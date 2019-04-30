import React, { Component } from 'react';
import Giphy from './components/Giphy';
import './stylesheets/App.css';

/*
* Includes: 
*	- Giphy 
*/
class App extends Component {
	constructor() {
		super();
		this.state = { width: 0, height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
	  this.updateWindowDimensions();
	  window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateWindowDimensions);
	}
	/*
	* Children's display in response to app's current Dimensions
	*/
	updateWindowDimensions() {
	  this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render() {
		return (
		  <div className="App">
		    <Giphy dimensions={this.state}/>
		  </div>
		);
	}
}

export default App;
