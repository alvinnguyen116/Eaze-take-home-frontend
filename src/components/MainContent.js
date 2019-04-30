import React, { Component } from 'react';
import Trending from '../components/Trending'; 
import GifExpanded from '../components/GifExpanded';
import GifRandom from '../components/GifRandom';
import SearchResult from '../components/SearchResult';
import '../stylesheets/MainContent.css';

/*
* 2 Page States  
*
* Main Page:
*	- Trending 
*	- Random 
* Expanded Page: 
*	- Expanded Gif 
*	- Search Result 
*/
class MainContent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			info_is_off: false,
			favorites: [],
			share_is_off: true,
		}
		this.handleInfoButton = this.handleInfoButton.bind(this);
		this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
		this.handleShareButton = this.handleShareButton.bind(this);
	}

	/*
	* Used in Gif Expanded & Expandable Gif 
	* Turn off/on according to GifButtons 
	* Turn off if new Gif Expanded 
	*/
	handleShareButton(boolean) {
		this.setState({
			share_is_off: boolean,
		});
	}

	handleInfoButton(boolean) {
		this.setState({
			info_is_off: boolean,
		});
	}

	/*
	* Add or remove Gif Object 
	* depending on id in favorites or not
	*/
	handleFavoriteButton(pic_object) {
		var copy = this.state.favorites.slice();
		var ids = this.state.favorites.map((pic)=>{
			return pic.id;
		})
		if (ids.indexOf(pic_object.id) > -1) {
			copy.splice(ids.indexOf(pic_object.id), 1);
			this.setState({
				favorites: copy,
			});
		} else {
			this.setState({
				favorites: [pic_object,...this.state.favorites],
			});
		}
	}

	render() {
		const style = {
			display: this.props.active_gif === null ? 'block' : 'flex',
		}
		return (
		  <div className="main-content" style={style}>
		  	<Trending api_key={this.props.api_key} titleToSearchable={this.props.titleToSearchable} active_title={this.props.active_title} handleSubmit={this.props.handleSubmit} favorites={this.state.favorites} handleShareButton={this.handleShareButton}  trending_visible={this.props.trending_visible} handleInfoButton={this.handleInfoButton} handleActiveGif={this.props.handleActiveGif} />
		  	<GifRandom setGif={this.props.setGif} is_gif={this.props.is_gif} api_key={this.props.api_key} titleToSearchable={this.props.titleToSearchable} randoms={this.props.randoms} setRandoms={this.props.setRandoms} active_title={this.props.active_title} handleSubmit={this.props.handleSubmit} search_content={this.props.search_content} active_gif={this.props.active_gif} handleShareButton={this.handleShareButton} trending_visible={this.props.trending_visible} handleActiveGif={this.props.handleActiveGif} handleInfoButton={this.handleInfoButton} />
		  	<GifExpanded share_is_off={this.state.share_is_off} handleShareButton={this.handleShareButton} favorites={this.state.favorites} handleFavoriteButton={this.handleFavoriteButton} pic={this.props.active_gif} info_is_off={this.state.info_is_off} handleInfoButton={this.handleInfoButton} dimensions={this.props.dimensions} />
		  	<SearchResult setGif={this.props.setGif}  is_gif={this.props.is_gif} api_key={this.props.api_key} titleToSearchable={this.props.titleToSearchable} active_title={this.props.active_title} handleSubmit={this.props.handleSubmit} search_content={this.props.search_content} active_gif={this.props.active_gif} handleShareButton={this.handleShareButton} trending_visible={this.props.trending_visible} handleActiveGif={this.props.handleActiveGif} handleInfoButton={this.handleInfoButton} />
		  </div>
		);
	}
}

export default MainContent;
