import React, { Component } from 'react';
import ExpandableGif from '../components/ExpandableGif';
import MediaSelector from '../components/MediaSelector';
import '../stylesheets/GifRandom.css';

/*
* Displays Gifs or Stickers according to random word
* Renders null if Expanded State 
*/
class GifRandom extends Component {

	constructor() {
		super();
		this.state = {
			stickers: [],
			rotate: 0,
		}
	}

	/*
	* Button rotates back and forth 180°
	*/
	renderRandomButton(){
		const className = 'rotate-'+ (this.state.rotate % 360);
		return (
			<svg className={"GIF-SVG random-svg " + className} onClick={()=>{
				this.setState({rotate: this.state.rotate + 90}); 
				this.props.setRandoms(this.props.is_gif, true, 0);
			}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<path className="circle" d="m256 512c-140.609375 0-256-115.390625-256-256s115.390625-256 256-256 256 115.390625 256 256-115.390625 256-256 256zm0 0"/>
				<path className="circle" d="m512 256c0-140.609375-115.390625-256-256-256v512c140.609375 0 256-115.390625 256-256zm0 0" fill="#c6e2e7"/>
				<path className="arrow" d="m376 166-60 90h30c0 24.039062-9.359375 46.640625-26.351562 63.648438-17.007813 16.992187-39.609376 26.351562-63.648438 26.351562-14.589844 0-28.652344-3.449219-41.253906-9.960938l-33.394532 50.097657c21.984376 12.636719 47.472657 19.863281 74.648438 19.863281 41.421875 0 78.921875-16.789062 106.066406-43.933594 27.144532-27.144531 43.933594-64.644531 43.933594-106.066406h31zm0 0" />
				<path className="arrow" d="m362.066406 362.066406c27.144532-27.144531 43.933594-64.644531 43.933594-106.066406h31l-61-90-60 90h30c0 24.039062-9.359375 46.640625-26.351562 63.648438-17.007813 16.992187-39.609376 26.351562-63.648438 26.351562v60c41.421875 0 78.921875-16.789062 106.066406-43.933594zm0 0" />
				<path className="arrow" d="m256 106c-41.421875 0-78.921875 16.789062-106.066406 43.933594-27.144532 27.144531-43.933594 64.644531-43.933594 106.066406h-30l60 90 60-90h-30c0-24.039062 9.359375-46.640625 26.351562-63.648438 17.007813-16.992187 39.609376-26.351562 63.648438-26.351562 14.589844 0 28.652344 3.449219 41.253906 9.957031l33.394532-50.09375c-21.984376-12.636719-47.472657-19.863281-74.648438-19.863281zm0 0" />
				<path className="arrow" d="m297.253906 175.957031 33.394532-50.09375c-21.984376-12.636719-47.472657-19.863281-74.648438-19.863281v60c14.589844 0 28.652344 3.449219 41.253906 9.957031zm0 0" />
			</svg>
		);
	}

	/*
	* If there are no random objects:  
	* 		Return Error Message
	* Else: 
	*		Convert Random Gifs to Expandable Gifs 
	*/
	randomsToExpandable(){
		if (this.props.randoms.length === 0) {
			return (
				<h1 className="GIF-TITLE">
					{'Couldn\'t find any ' + (this.props.is_gif === true ? 'GIFS' : 'Stickers')}
				</h1>
			);
		}
		return this.props.randoms.map((pic)=>{
			return (<ExpandableGif key={pic.id} titleToSearchable={this.props.titleToSearchable} is_gif={this.props.is_gif} active_title={this.props.active_title} searchResult={this.props.searchResult} handleSubmit={this.props.handleSubmit} height_is_fixed={false} handleShareButton={this.props.handleShareButton} pic={pic} handleActiveGif={this.props.handleActiveGif} handleInfoButton={this.props.handleInfoButton}/>);
		});
	}

	render() {
		if (this.props.active_gif !== null) {
			return null;
		}
		/*
		* Animation for Gifs & Stickers Button 
		*/
		const style = {
			transform: this.props.is_gif ? 'translateX(0)': 'translateX(52px)',
			width: this.props.is_gif ? '51px' : '86px',
		}; 
		
		return (
			<div className="gif-random">
				<div className="title-container">
					<h1 className='GIF-TITLE flex'>
						<div>{'random word'}</div>
						{this.renderRandomButton()}
						<div className='random-word'>{this.props.active_title}</div>
					</h1> 
					<MediaSelector is_gif={this.props.is_gif} gif_onclick={()=>{this.props.setRandoms(true, false, 0)}} sticker_onclick={()=>{this.props.setRandoms(false, false, 0)}} />
				</div>
				<div className="random-container">
					{this.randomsToExpandable()}
				</div>
			</div>
		);
	}
}

export default GifRandom;
