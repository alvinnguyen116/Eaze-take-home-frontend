import React, { Component } from 'react';
import ExpandableGif from '../components/ExpandableGif';
import MediaSelector from '../components/MediaSelector';
import '../stylesheets/Trending.css';
/*
* https://kenwheeler.github.io/slick/
*/
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

/*
* Trending Endpoint
* https://developers.giphy.com/docs/
*/
class Trending extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pictures: [],
			is_gif: true,
		}
	}

	componentWillMount() {
		this.setPictures(true);
	}

	setPictures(is_gif) {
		let path = 'https://api.giphy.com/v1/'
		if (is_gif) {
			path += 'gifs'
		} else {
			path += 'stickers'
		}
		path += '/trending?api_key=' + this.props.api_key;	

		fetch(path)
		.then(results =>{
			return results.json();
		}).then(data=> {
			this.setState({
				is_gif: is_gif,
				pictures: data.data,
			});
		})
	}

	/*
	* Converts GIF Objects into Expandable Gifs   
	*/
	picturesToExpandable() {
		return this.state.pictures.map((pic)=>{
			return (<ExpandableGif key={pic.id} titleToSearchable={this.props.titleToSearchable} active_title={this.props.active_title} is_gif={this.state.is_gif} handleSubmit={this.props.handleSubmit} height_is_fixed={true} searchResult={this.props.searchResult} handleShareButton={this.props.handleShareButton} pic={pic} handleActiveGif={this.props.handleActiveGif} handleInfoButton={this.props.handleInfoButton}/>);
		})
	}

	render() {
		if (this.props.trending_visible === false) {
			return null;
		}

		/*
		* Variable Width Slick Carousel 
		*/
		var settings = {
		  dots: false,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 1,
		  centerMode: false,
		  variableWidth: true
		};

		return (
			<div className='trending'>
				<div className="title-container">
					<h1 className='GIF-TITLE flex relative'>
						<div className="trending-btn">Trending</div>
					</h1>
					<MediaSelector is_gif={this.state.is_gif} gif_onclick={()=>{this.setPictures(true)}} sticker_onclick={()=>{this.setPictures(false)}}/>
				</div>
				<Slider className="gif-list" {...settings}>
					{ this.picturesToExpandable() }
				</Slider>
			</div>
		);
	}
}

export default Trending;
