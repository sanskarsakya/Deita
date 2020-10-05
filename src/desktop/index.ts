import { app, BrowserWindow } from "electron";


import * as path from "path";
import * as url from 'url';
// import { Model } from 'objection';



// IPCS
import ClaszIpc from './../ipcs/db.ipc';

// const connection = require('../Objection');
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

let mainWindow: Electron.BrowserWindow;

function createWindow() {


  installExtension(REDUX_DEVTOOLS)
    .then((name: string) => console.log(`Added Extension:  ${name}`))
    .catch((err: any) => console.log('An error occurred: ', err));


  ClaszIpc.listen();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    // height        : 600,
    // width         : 800,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.maximize();
  mainWindow.show();

  /**
   * USE FOR PRODUCTION
   */
  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/index.html`),
  //     protocol: 'file:',
  //     slashes : true,
  //   })
  // )

  /**
   * USE FOR DEVELOPMENT
   */
  mainWindow.loadURL('http://localhost:4200');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}


app.on("ready", () => {
  // Model.knex(connection);

  /**
   * start migration and seeding
   */
  // connection.migrate.latest()
  // .then(function() {
  //   return connection.seed.run();
  // })
  // .then(function() {
  //   // migrations are finished
  // });
  // decrypt('./tar/tar_file.tgz.enc');
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    // decrypt('./tar/tar_file.tgz.enc');
    createWindow();
  }
});

