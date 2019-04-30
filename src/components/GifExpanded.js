import React, { Component } from 'react';
import GifButtons from '../components/GifButtons';
import GifPanels from '../components/GifPanels';
import '../stylesheets/GifExpanded.css';

/*
* Opens an Expandable Gif on Click  
* Includes: 
*	- Gif Buttons 
* 	- Gif Panels
*	- Meta Title change 
*/
class GifExpanded extends Component {

	/*
	* Calculates max width for Gif Expanded 
	* App.width = Screen.width * .90 
	* TrendingVertical.width = 212
	*/
	calculateMaxWidth() {
		return (this.props.dimensions.width*.9) - 212; 
	}

	/*
	* Giphy marginTop = 10px 
	* Logo Height = 70px 
	* Search Bar Height = 52px
	* Main Content Height = 20px
	* Title height = 31px 
	* IMG marginBottom = 20px
	* GIF expanded marginBottom = 20px
	*/
	calculateMaxHeight() {
		return this.props.dimensions.height - 10 - 70 - 52 - 20 - 31- 20 - 20;
	}

	/*
	* Finds largest image type that is less
	* than screen max width and max height.
	* Return Format as String 
	*/
	findBestImageFormat() {
		const maxWidth = this.calculateMaxWidth(); 
		const maxHeight = this.calculateMaxHeight(); 
		const {images} = this.props.pic; 

		/*
		* Get list of possible keys, 
		* Remove unwanted keys 
		*/
		let keys = Object.keys(images);
		keys.splice( keys.indexOf('fixed_height_still'), 1 );
		keys.splice( keys.indexOf('fixed_width_still'), 1 );
		keys.splice( keys.indexOf('fixed_height_small_still'), 1 );
		keys.splice( keys.indexOf('fixed_width_small_still'), 1 );
		keys.splice( keys.indexOf('downsized_still'), 1 );
		keys.splice( keys.indexOf('original_still'), 1 );
		keys.splice( keys.indexOf('480w_still'), 1 );

		/*
		* Apply max height and width constraints 
		*/
		let widthToType = {}; 
		for(let i = 0; i < keys.length; i++) {
			if ((images[keys[i]].width < maxWidth) && (images[keys[i]].height < maxHeight)) {
				widthToType[images[keys[i]].width] = keys[i];
			}
		}

		/*
		* Returns format with largest width
		*/
		keys = Object.keys(widthToType).map((num) =>{return parseInt(num, 10)});
		const bestKey = Math.max(...keys);
		return widthToType[bestKey];
	}

	/*
	* render img or video according format type
	*/
	renderImgOrVideo(format) {
		const {title} = this.props.pic;
		const IMG = this.props.pic.images[format];
		let {width} = IMG;
		let {height} = IMG;
		let is_img = true;
		if (IMG.url === undefined) {
			is_img = false;
		}

		/*
		* Scale an image if it's too small 
		*/
		const SCALES = [2,1.75, 1.5,1.25];
		for (let i = 0; i < SCALES.length; i++) { 
			if ((width <= this.calculateMaxWidth()/SCALES[i]) && (height <= this.calculateMaxHeight()/SCALES[i])) {
				width *= SCALES[i];
				height *= SCALES[i];
				break;
			}
		}

		if (is_img === false) {
			const {mp4} = IMG;
			return (
				<video src={mp4} autoPlay loop muted playsInline onError={()=>{
					this.onError=()=>{}; 
					this.src=mp4;
				}}></video>
			); 
		} else {
			const {url} = IMG; 
			return (
				<img src={url} height={height} width={width} alt={title}/>
			); 
		} 
	}

	
	render() {
		if (this.props.pic === null) {
			return null;
		}
		
		let {title} = this.props.pic;
		if (title.trim() === '') {
			title = 'N/A';
		}
		const format = this.findBestImageFormat();
		document.title = this.props.pic.title.toUpperCase().trim();

		return (
			<div className="gif-expanded">
				<div>
					<div className="title-container">
						<h1 className="title GIF-TITLE">{title}</h1>
						<GifButtons pic={this.props.pic} info_is_off={this.props.info_is_off} handleInfoButton={this.props.handleInfoButton} handleShareButton={this.props.handleShareButton} handleFavoriteButton={this.props.handleFavoriteButton} share_is_off={this.props.share_is_off} favorites={this.props.favorites}/>
					</div>
					<div className="asset-container">
						{this.renderImgOrVideo(format)}	
						<GifPanels format={format} pic={this.props.pic} share_is_off={this.props.share_is_off} info_is_off={this.props.info_is_off}/>
					</div>
				</div>
			</div>
		);
	}
}

export default GifExpanded;
