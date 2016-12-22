import React from 'react';
import ReactDOM from 'react-dom';
import Home from './App';
import './index.css';
import MuiThemeProvider 		from 'material-ui/styles/MuiThemeProvider';

const Movie= () => (
 <MuiThemeProvider >

  <Home/>
  
 </MuiThemeProvider>
);

ReactDOM.render(
  <Movie />,
  document.getElementById('root')
);
