import React, { Component } from 'react';
import SearchBar from '../components/SearchBar'; 
import MainContent from '../components/MainContent';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Logo from '../components/Logo';
import '../stylesheets/Giphy.css';

/*
* Main Page includes:
* -	Logo
* - Search Bar 
* - Main Content 
* - Bottom Scroll Listener  
*/
class Giphy extends Component {

	constructor() {
		super();
		this.state = {
			trending_visible: true,
			active_gif: null,  
			is_gif: true,
			search_content: [],
			randoms: [],
			active_title: '',
			/*
			* - Developer Key - 
			* Get Production Key for more requests  
			*/
			api_key: 'JnDTtMn3Qf95yDibTNoTlN5PqaxSSHeB',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitAndActive = this.handleSubmitAndActive.bind(this);
		this.setMainState = this.setMainState.bind(this);
		this.handleActiveGif = this.handleActiveGif.bind(this);
		this.setRandoms = this.setRandoms.bind(this);
		this.callback = this.callback.bind(this);
	}

	componentWillMount() {
		this.setRandoms(true, true, 0);
	}

	/*
	*  Search Endpoint with random string and rating
	*  Parameters:
	*  (is_gif) - boolean for deciding Gif or Sticker request 
	*  (is_new) - boolean for setting new word or using current 
	*  (offset) - amount to offset search by   
	*/
	setRandoms(is_gif, is_new, offset) {
		let random_word = this.state.active_title;
		if (is_new === true) {
			random_word = this.getRandom();
		}
		let path = 'https://api.giphy.com/v1/';
		if (is_gif === true) {
			path += 'gifs';
		} else {
			path += 'stickers';
		}
		path += '/search?api_key=' + this.state.api_key;
		path += '&q=' + random_word;
		path += '&offset=' + offset; 

	    fetch(path, {mode: 'cors'})
		.then(results =>{
			return results.json();
		}).then(data=> {
			this.setState({
				is_gif: is_gif,
				active_title: random_word,
				randoms: offset === 0 ? data.data : this.state.randoms.concat(data.data),
			});
		});
	}

	/*
	* Handle Submit for Search Endpoint 
	* (str) - search string 
	* (is_gif) - boolean for sending Gif or Sticker request  
	* (offset) - integer to offset search by 
	*/
	handleSubmit(str, is_gif, offset) {
		let path = 'https://api.giphy.com/v1/' 
		if (is_gif === true) {
			path += 'gifs'
		} else {
			path += 'stickers'
		}
		path += '/search?api_key=' + this.state.api_key
		path += '&q=' + str;
		path += '&offset=' + offset; 
	    fetch(path)
		.then(results =>{
			return results.json();
		}).then(data=> {
			this.setState({
				is_gif: is_gif,
				trending_visible: false,
				search_content: offset === 0 ? data.data : this.state.search_content.concat(data.data),
				active_title: str, 
			});
		})
	}


	/*
	* Handle Submit AND Active Gif for Search Endpoint 
	*/
	handleSubmitAndActive(str, is_gif) {
		let path = 'https://api.giphy.com/v1/' 
		if (is_gif === true) {
			path += 'gifs'
		} else {
			path += 'stickers'
		}
		path += '/search?api_key=' + this.state.api_key
		path += '&q=' + str;
	    fetch(path)
		.then(results =>{
			return results.json();
		}).then(data=> {
			const rand = Math.floor(Math.random() * (data.data.length -1));
			if (data.data.length === 0) {
				alert('Couldn\'t find any GIFS or Stickers');
			} else {
				this.setState({
					is_gif: is_gif,
					trending_visible: false,
					search_content: data.data,
					active_gif: data.data[rand],
					active_title: this.titleToSearchable(data.data[rand]), 
				});
			}
		})
	}


	/*
	* Get Random String 
	* Used in GifRandom 
	*/
	getRandom() {
		var randomWords = require('random-words');
		return randomWords();
	}

	/*
	* Sets active_gif in Giphy to a GIF object 
	*/	
	handleActiveGif(pic) {
		this.setState({
			active_gif: pic,
			active_title: this.titleToSearchable(pic),
			trending_visible: false,
		});
	}

	/*
	* Convert Gif Object to a searchable Title 
	*/
	titleToSearchable(pic){
		var title = pic.title.toLowerCase().trim();
		if (title === '') {
			var slug = pic.slug.toLowerCase().trim().split('-');
			/*
			* Slugs have interesting search terms 
			* but also includes random Integers  
			*/
			slug = slug.filter(function(str){return !(/\d/.test(str))})
			if (slug.length === 1) {
				return pic.username;
			}
			return slug.join(' ');
		}
		var title_arr = title.split(" "); 
		var without_gif = title_arr.slice(0, title_arr.indexOf('gif'));
		return without_gif.join(' ');
	}

	/*
	* Sets layout and content to Main Page state 
	*/
	setMainState() {
		this.setState({
			trending_visible: true,
			main_content: [],
			active_gif: null,
			active_title: '',
			search_content: [],
			is_gif: true,
		});
		this.componentWillMount();
	}


	/*
	* Used in BottomScrollListener 
	* Make a request and add to content  
	*/
	callback() { 
		if (this.state.active_gif !== null) {
			this.handleSubmit(this.state.active_title, this.state.is_gif === true, this.state.search_content.length)
		} else {
			this.setRandoms(this.state.is_gif === true, false, this.state.randoms.length)
		}
	}


	render() {
		return (
			<div className="giphy">
				<Logo setMainState={this.setMainState}/>
		    	<SearchBar handleSubmit={this.handleSubmit} handleSubmitAndActive={this.handleSubmitAndActive}/>
		    	<MainContent setGif={this.setGif} is_gif={this.state.is_gif} setRandoms={this.setRandoms} titleToSearchable={this.titleToSearchable} randoms={this.state.randoms} api_key={this.state.api_key} active_title={this.state.active_title} handleSubmit={this.handleSubmit} dimensions={this.props.dimensions} search_content={this.state.search_content} handleActiveGif={this.handleActiveGif} active_gif={this.state.active_gif} trending_visible={this.state.trending_visible}/>
				<BottomScrollListener onBottom={this.callback} />
			</div>
		);
	}
}

export default Giphy;
