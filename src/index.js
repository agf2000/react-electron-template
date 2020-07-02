import React from 'react';
// import Router from './Router';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

// ReactDOM.render(
// 	<React.StrictMode>
// 		<Router />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

import Home from './App';
import Image from './pages/Image';
import Settings from './pages/Settings';
import About from './pages/About';

ReactDOM.render(
	<Router>
		<div>
			<main>
				<Route exact path="/" component={Home} />
				<Route path="/image" component={Image} />
				<Route path="/settings" component={Settings} />
				<Route path="/about" component={About} />
			</main>
		</div>
	</Router>,
	document.getElementById('root')
);
