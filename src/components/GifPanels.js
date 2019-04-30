import React, { Component, Fragment } from 'react';

/*
* Used in Gif Expanded 
* Panels are controlled by Gif Buttons
*/
class GifPanels extends Component {

	/*
	* Panel visible according to (=>) Button 
	* Displays 'Sharing Links', URL's may be blank
	*/
	renderSharePanel() {
		const {url} = this.props.pic;
		const {bitly_url} = this.props.pic;
		const {embed_url} = this.props.pic;
		const {source} = this.props.pic;
		const {source_post_url} = this.props.pic;
		const style = {
			opacity: this.props.share_is_off ? 1 : 0,
		}

		return (<div className="share-box panel" style={style}>
					<a href={url} target="_blank" rel="noopener noreferrer">{'Original'}</a>
					<a href={bitly_url} target="_blank" rel="noopener noreferrer">{'Bitly'}</a>
					<a href={embed_url} target="_blank" rel="noopener noreferrer">{'Embed'}</a>
					<a href={source} target="_blank" rel="noopener noreferrer">{'Source'}</a>
					<a href={source_post_url} target="_blank"  rel="noopener noreferrer">{'Source Post'}</a>
				</div>); 
	}

	/*
	* Panel is visible according to (?) Button 
	* Includes:
	* 	- username
	*	- rating
	* 	- import_datetime
	*	- width x height (according to format)
	*	- source (according to format)
	*/
	renderInfoPanel() {
		const {username} = this.props.pic;
		const {rating} = this.props.pic;
		let {import_datetime} = this.props.pic;
		const {width} = this.props.pic.images[this.props.format];
		const {height} = this.props.pic.images[this.props.format];
		import_datetime = (import_datetime ? import_datetime.slice(5,7)  + "/" + import_datetime.slice(8,10) + "/" + import_datetime.slice(0,4) : 'N/A');
		let source = 'URL'; 
		if (this.props.pic.images[this.props.format].url === undefined) {
			source = 'MP4';
		}
		const style = {
			opacity: this.props.info_is_off ? 1 : 0,
		}
		return (<div className="info-box panel" style={style}>
					<div>{'Owner: ' + (username ? username : 'N/A')}</div>
					<div>{'Rating: ' + rating.toUpperCase()}</div>
					<div>{'Dimension: ' + width +' x ' + height + ' px'}</div>
					<div>{'Uploaded: ' + import_datetime}</div>
					<div>{'Type: ' + source}</div>							
				</div>);
	}

	
	render() {
		return (
		  <Fragment>
		  	{this.renderInfoPanel()}
		  	{this.renderSharePanel()}
		  </Fragment>
		);
	}
}

export default GifPanels;


