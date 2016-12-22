import React, { Component }    	from 'react';
import ReactDOM      			from 'react-dom';
import './App.css';
import _						from 'lodash';
import Request 					from 'superagent';
import Pagination               from 'react-js-pagination';
import AppBar     				from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import orange500 from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
require("../bootstrap-3.3.5/less/bootstrap.less");
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';



const styles = {
 root: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-around',
 },
 gridList: {
   width: 500,
   height: 450,
   overflowY: 'auto',
 },
 titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
 underlineStyle: {
   borderColor: orange500,
 }
};


/** For horizontal Scrool bar*/

const styles1 = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
  {
    img: '.images/img1.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: '.images/img2.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: '.images/img3.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: '.images/img4.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: '.images/img5.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/img1.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];










class Home extends React.Component {
	

constructor(props){
    super();
    this.state = {
     movies: [],
 	 activePage: 1
 	};
 	this.handlePageChange = this.handlePageChange.bind(this);
 	this.updateSearch = this.updateSearch.bind(this);
  }

  componentWillMount(){
    this.search();
  }

  updateSearch (event){
  	this.search(event.target.value);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
     this.search(this.refs.query.value, pageNumber);

  }

  render(){
    return (
    	<div>
    		<div>
			<AppBar 
      			title="Movie Lib"
      			iconClassNameRight="muidocs-icon-navigation-expand-more"
      		/>
      		</div>

      	<div style={styles1.root}>
    		<GridList style={styles1.gridList} cols={2.2}>
      		{tilesData.map((tile) => (
		        <GridTile
		          key={tile.img}
		          title={tile.title}
		          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
		          titleStyle={styles1.titleStyle}
		          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
		        >
		          <img src={tile.img} />
		        </GridTile>
        	))}
    		</GridList>
    	</div>	

      	<div className="main">Search movies{'    : '}

    	<TextField
        	hintText="Movie Title"
        	hintStyle={styles.underlineStyle}
    		floatingLabelText="Movie Title"
      		onChange= {(e) => {this.updateSearch(e);}} 
      	/>
      	<RaisedButton label="Search" />
    			
    	<div style={styles.root}>
   			<GridList
    			cellHeight={150}
    			style={styles.gridList}>
	       		{_.map(this.state.movies,(tile) => (
	       			
	       			<GridTile
	        			key={tile.Poster}
	        			title={tile.Title}
	        			subtitle={<span>Released Year <b>{tile.Year}</b></span>}>
	        			<img src={tile.Poster} />
	        		</GridTile>
	    		))}
    		</GridList>
        </div>

        <div>
	    <Pagination 
	        	activePage={this.state.activePage} 
		        itemsCountPerPage={10} 
		        totalItemsCount={450} 
		        pageRangeDisplayed={5}
		        onChange={this.handlePageChange}
	    />
	    </div>

      	</div>
      	</div>
      	);
  }

  search(query = " ",pageNumber){
  	
    var url = `http://www.omdbapi.com?s=${query}&page=${pageNumber}`;
    Request.get(url).then((response) => {
      this.setState({
        movies: response.body.Search,
        total: response.body.totalResults
      });
    });
  }

}


export { Home as default };





