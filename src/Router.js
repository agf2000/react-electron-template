import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

import Image from './pages/Image';
import About from './pages/About';
import Settings from './pages/Settings';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route exact path="/image" component={Image} />
			<Route exact path="/about" component={About} />
			<Route exact path="/settings" component={Settings} />
		</Switch>
	</BrowserRouter>
);

export default Router;
