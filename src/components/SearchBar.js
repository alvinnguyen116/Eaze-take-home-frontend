import React, { Component } from 'react';
import '../stylesheets/SearchBar.css';

/*
* Search Endpoint
* https://developers.giphy.com/docs/ 
*/
class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.placeholders = [
			"Search all GIF's and Stickers",
			"Find related GIF's and Stickers",
			"Search all GIFs and Stickers"
		];
		this.state = {
			animate: true,
			value: '',
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	renderPlaceholder() {
		if (this.state.animate === true) {
			return (
				<div>
					<div className="animate-container">
						{ this.placeholders.map((p, index)=>{ return <p key={index}>{p}</p>; })}
					</div>
				</div>
			);
		}
		return null;
	}

	/*
	* Only animate placeholder if value null
	*/
	handleInputChange(event) {
		this.setState({
			animate: event.target.value.trim() === '',
			value: event.target.value,
		});
	}

	render() {
		const img = require('../icons/search.svg');
		return (
			<form className="search-bar" onSubmit={(event)=>{
				event.preventDefault();
				this.props.handleSubmitAndActive(this.state.value, true);
			}}>
				{this.renderPlaceholder()}
				<input type="text" value={this.state.value} onChange={this.handleInputChange}
				autoCapitalize="off" autoCorrect="off" autoComplete="off"/>
				<div className="search-btn">
					<input type="submit" value=''/>
					<img src={img} alt='search-icon'/>
				</div>
			</form>
		);
	}
}

export default SearchBar;

