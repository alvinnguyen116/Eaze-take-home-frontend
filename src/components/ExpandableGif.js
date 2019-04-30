import React, { Component } from 'react';
/*
* Used in Trending
* onClick - Displays Gif Expanded  
*/
class ExpandableGif extends Component {

	render() {
		const {title} = this.props.pic;
		/*
		* Images displayed according to Trending's Direction:
		* 	- Horizontal -- FIXED HEIGHT
		*	- Vertical   -- FIXED WIDTH
		*/
		const img = this.props.height_is_fixed === true ? this.props.pic.images.fixed_height : this.props.pic.images.fixed_width;
		const {url} = img;
		const {height} = img;
		const {width} = img;
		// console.log('this.props.active_title', this.props.active_title);
		/*
		* Weight scales IMG 
		* Default Fixed Height looks too large, scale it down 
		*/
		const WEIGHT = this.props.height_is_fixed ? .75 : 1;
		// console.log('this.props.is_gif === true', this.props.is_gif === true);
		const style = {
			height: height*WEIGHT + 'px',
			width: width*WEIGHT + 'px',
			margin: this.props.height_is_fixed === true ? '6px 6px 6px 0px' : '0px 6px 6px 0px',
		}

		return (
			<img alt={title} src={url} style={style} onClick={()=>{
				this.props.handleActiveGif(this.props.pic);
				this.props.handleInfoButton(false);
				this.props.handleShareButton(false);
				window.scroll({top: 0, left: 0, behavior: 'smooth' });
				this.props.handleSubmit(this.props.titleToSearchable(this.props.pic), this.props.is_gif === true, 0);
			}} />
		);
	}
}

export default ExpandableGif;
