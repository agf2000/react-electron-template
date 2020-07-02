const { app, Tray, BrowserWindow, Menu, ipcMain, dialog, Notification } = require('electron');
const find = require('find-process');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow, imageWindow, settingsWindow, aboutWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 680,
		x: 10,
		y: 10,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	});

	mainWindow.setMenu(null);
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
	mainWindow.webContents.openDevTools();

	const mainMenu = Menu.buildFromTemplate(basicMenuTemplate);
	mainWindow.setMenu(mainMenu);

	imageWindow = new BrowserWindow({
		show: false,
		width: 600,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
		parent: mainWindow,
	});

	imageWindow.setMenu(null);
	imageWindow.loadURL(isDev ? 'http://localhost:3000/image' : `file://${path.join(__dirname, '../build/index.html#image')}`);
	imageWindow.on('close', (e) => {
		e.preventDefault();
		imageWindow.hide();
	});

	settingsWindow = new BrowserWindow({
		show: false,
		width: 600,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	});

	settingsWindow.setMenu(null);
	settingsWindow.loadURL(isDev ? 'http://localhost:3000/settings' : `file://${path.join(__dirname, '../build/index.html#settings')}`);
	settingsWindow.on('close', (e) => {
		e.preventDefault();
		settingsWindow.hide();
	});

	aboutWindow = new BrowserWindow({
		show: false,
		width: 600,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	});

	aboutWindow.setMenu(null);
	aboutWindow.loadURL(isDev ? 'http://localhost:3000/about' : `file://${path.join(__dirname, '../build/index.html#about')}`);
	aboutWindow.on('close', (e) => {
		e.preventDefault();
		aboutWindow.hide();
	});
}

app.on('ready', createWindow);

app.on('before-quit', (e) => {
	find('port', 3000)
		.then(function (list) {
			if (list[0] != null) {
				process.kill(list[0].pid, 'SIGHUP');
			}
		})
		.catch((e) => {
			console.log(e.stack || e);
		});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('open-image', (event, arg) => {
	imageWindow.show();
	imageWindow.webContents.send('args', arg);
});

ipcMain.on('toggle-settings', () => {
	settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
});

ipcMain.on('toggle-about', () => {
	aboutWindow.isVisible() ? aboutWindow.hide() : aboutWindow.show();
});

const basicMenuTemplate = [
	{
		label: 'Arquivo',
		submenu: [
			{
				label: 'Configurações',
				accelerator: 'CmdOrCtrl+,',
				click: () => {
					settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
				},
			},
			{
				label: 'About',
				accelerator: 'CmdOrCtrl+,',
				click: () => {
					aboutWindow.isVisible() ? aboutWindow.hide() : aboutWindow.show();
				},
			},
		],
	},
	{
		label: 'Recarregar',
		accelerator: 'CmdOrCtrl+R',
		click(item, focusedWindow) {
			if (focusedWindow) focusedWindow.reload();
		},
	},
	{
		label: 'Ferramentas',
		submenu: [
			{
				label: 'Diagnóstico',
				accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
				click(item, focusedWindow) {
					if (focusedWindow) focusedWindow.webContents.toggleDevTools();
				},
			},
		],
	},
	{
		label: 'Fechar',
		click(item, focusedWindow) {
			if (focusedWindow) focusedWindow.close();
		},
	},
	{
		label: 'Edit',
		submenu: [{ label: 'Menu Item 1' }, { label: 'Menu Item 2' }, { label: 'Menu Item 3' }],
	},
];
