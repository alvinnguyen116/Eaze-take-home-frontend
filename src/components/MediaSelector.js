import React, { Component } from 'react';
import '../stylesheets/MediaSelector.css';

/*
* Gif and Sticker Selector 
* Used in:
* 	- Trending 
*	- Search Result
*	- Random 
*/
class MediaSelector extends Component {

	render() {
		const style = {
			transform: this.props.is_gif ? 'translateX(0)': 'translateX(52px)',
			width: this.props.is_gif ? '51px' : '86px',
		}; 

		return (
		  	<h1 className="GIF-TITLE flex relative">
				<div className="pointer" onClick={this.props.gif_onclick}>Gifs</div>
				<div className="pointer sticker" onClick={this.props.sticker_onclick}>Stickers</div>
				<div className="animated-ellipse" style={style}></div>
			</h1>
		);
	}
}

export default MediaSelector;
