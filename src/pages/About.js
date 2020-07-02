import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
	return (
		<div>
			<p>Welcome to the About Page</p>
			<Link className="App-link" to="/">
				Link to Home
			</Link>
		</div>
	);
};

export default About;
