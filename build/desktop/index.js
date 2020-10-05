"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// import { Model } from 'objection';
// IPCS
const db_ipc_1 = require("./../ipcs/db.ipc");
// const connection = require('../Objection');
const electron_devtools_installer_1 = require("electron-devtools-installer");
let mainWindow;
function createWindow() {
    electron_devtools_installer_1.default(electron_devtools_installer_1.REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    db_ipc_1.default.listen();
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
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
electron_1.app.on("ready", () => {
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
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        // decrypt('./tar/tar_file.tgz.enc');
        createWindow();
    }
});
//# sourceMappingURL=index.js.map