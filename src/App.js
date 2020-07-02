import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function App() {
	const openImage = (image) => {
		ipcRenderer.send('open-image', image);
	};

	return (
		<div>
			<header>
				<p onClick={() => openImage('https://i.redd.it/392fuldi4v751.jpg')}>React Electron Boilerplate</p>
				<Link className="App-link" to="/about">
					Link to the About Page
				</Link>
			</header>
		</div>
	);
}

export default App;
