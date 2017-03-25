import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home.jsx';
import '../stylesheet/styles.css';
import '../../node_modules/materialize-css/dist/css/materialize.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min';

ReactDOM.render(<Home />, document.getElementById('app'));
