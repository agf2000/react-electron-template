import React, { useEffect, useState } from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const Image = () => {
	const [args, setArgs] = useState('');

	useEffect(() => {
		ipcRenderer.on('args', (event, arg) => {
			setArgs(arg);
		});
	}, []);

	return (
		<div className="about">
			<p>Welcome to the Image window "{args}"</p>
			<img src={args} alt="SomeImage" style={{ maxWidth: '100%' }} />
		</div>
	);
};

export default Image;
