import React, { Component } from 'react';
import ExpandableGif from '../components/ExpandableGif';
import MediaSelector from '../components/MediaSelector';
import '../stylesheets/SearchResult.css';

/*
* Displays Result from Search Bar 
* Only Renders in Expanded State,
* Otherwise returns null 
*/
class SearchResult extends Component {


	/*
	* If search content is empty: 
	* 		Return Error Message
	* Else:
	* 		Convert search Content to Expandable GIFs 
	*/
	searchResultToExpandable() {
		if (this.props.search_content.length === 0) {
			return (
				<h1 className='GIF-TITLE'>
				{'No Content Found :\'('}
				</h1>
			);
		} 
		return this.props.search_content.map((pic)=>{
			return (<ExpandableGif key={pic.id} titleToSearchable={this.props.titleToSearchable} active_title={this.props.active_title} is_gif={this.props.is_gif} height_is_fixed={false} handleSubmit={this.props.handleSubmit} handleShareButton={this.props.handleShareButton} pic={pic} handleActiveGif={this.props.handleActiveGif} handleInfoButton={this.props.handleInfoButton}/>);
		});
	}
	
	render() {
		if (this.props.active_gif === null) {
			return null; 
		} 

		return (
			<div className="search-result">
				<div className="search-title-container">
					<h1 className='GIF-TITLE flex relative'>
						<div className="trending-btn">Related</div>
					</h1>
					<MediaSelector is_gif={this.props.is_gif} gif_onclick={()=>{this.props.handleSubmit(this.props.active_title, true, 0)}} sticker_onclick={()=>{this.props.handleSubmit(this.props.active_title, false, 0)}} />
				</div>
				<div className="search-result-container">{this.searchResultToExpandable()}</div>
			</div>
		);
	}
}

export default SearchResult;
