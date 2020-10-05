const { app, BrowserWindow } = require('electron')

const path = require('path');
const url = require('url');

// HOT RELOAD SETUP
// try {
// 	require('electron-reloader')(module);
// } catch (_) {}

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    // win.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, `./index.html`),
    //         protocol: 'file:',
    //         slashes: true,
    //     })
    // )


    /**
     * USE FOR DEVELOPMENT
     */
    win.loadURL('http://localhost:4200');

    // Open the DevTools.
    win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


/**
 * Ipc TOC
 * data
 * config
 * connect database
 * load table
 * load dimension and measure
 * pie chart aggregation
 * bar chart aggregation
 * doughnut chart aggregation
 * scatter chart aggregation
 * chart type data
 * 
 * load config
 */

let data = [
    {
        province: "Province 1",
        cases: 21,
        price: 11,
        weight: 5
    },
    {
        province: "Province 1",
        cases: 19,
        price: 21,
        weight: 2
    },
    {
        province: "Province 1",
        cases: 88,
        price: 33,
        weight: 3
    },
    {
        province: "Province 2",
        cases: 33,
        price: 25,
        weight: 4
    },
    {
        province: "Province 2",
        cases: 55,
        price: 12,
        weight: 1
    },
    {
        province: "Province 2",
        cases: 66,
        price: 15,
        weight: 7
    },
    {
        province: "Province 3",
        cases: 23,
        price: 19,
        weight: 9
    },
    {
        province: "Province 3",
        cases: 56,
        price: 17,
        weight: 6
    },
    {
        province: "Province 3",
        cases: 67,
        price: 33,
        weight: 3
    },
    {
        province: "Province 4",
        cases: 89,
        price: 19,
        weight: 5.3
    },
    {
        province: "Province 4",
        cases: 34,
        price: 31,
        weight: 5.2
    },
    {
        province: "Province 4",
        cases: 56,
        price: 16,
        weight: 5.1
    },
    {
        province: "Province 4",
        cases: 33,
        price: 28,
        weight: 7
    }
];

let config = [
    {
        chart: "pie",
        dimension: "cases",
        measure: "province"
    },
    {
        chart: "line",
        dimension: "weight",
        measure: "province"
    },
    {
        chart: "scatter",
        dimension: "price",
        secondDimension: "weight",
        measure: "province"
    },
    {
        chart: "bar",
        dimension: "price",
        measure: "province"
    },
    {
        chart: "doughnut",
        dimension: "price",
        measure: "province"
    },
];


// setup database
const Knex = require('Knex');
// ipcs
const { ipcMain: ipc } = require('electron-better-ipc');


let db;
/**
 * CONNECT DATABASE
 */
ipc.answerRenderer('connect-database', async databaseConfig => {
    db = Knex(databaseConfig);
    console.log('connect-database')
    return 'connection success';
});

/**
 * LOAD TABLE
 */
ipc.answerRenderer('load-table', async () => {
    console.log('load-table');
    let response = await db.raw(`SELECT tablename FROM pg_tables WHERE schemaname='public'`);

    let final = {
        data: response.rows
    }
    console.log(final)
    return final;
});

/**
 * LOAD DIMENSION AND MEASURE
 */
ipc.answerRenderer('load-dimension-measure', async (tableName) => {
    console.log('load-dimension-measure')

    let dimensions = [];
    let measures = [];
    let result = await db.raw(`select column_name, data_type from information_schema.columns where table_name='${tableName}';`)

    // let results = await db.row(`select * from '${tableName}`);
    // console.log(results.rows);
    // data = results.rows;

    let rows = result.rows;
    console.log(rows)
    rows.forEach(row => {
        if (row.data_type === 'integer') {
            dimensions.push(row);
        } else {
            measures.push(row)
        }
    });

    let response = {
        dimensions: dimensions,
        measures: measures,
    }
    return response;
});


/**
 * PIE CHART AGGREGATION
 */
ipc.answerRenderer('load-pie-chart-agg', async (payload) => {
    let reduced = data.reduce((prev, current) => {
        let key = current[payload.measure];
        if (!prev[key]) {
            prev[key] = 0;
        }
        prev[key] += current[payload.dimension];
        return prev;
    }, {});

    let final = Object.keys(reduced).map(key => {
        return {
            value: reduced[key],
            name: key
        };
    });

    console.log('final', final)
    return final;
});

/**
 * BAR CHART AGGREGATION
 */
ipc.answerRenderer('load-bar-chart-agg', async (payload) => {
    let reduced = data.reduce((prev, current) => {
        let key = current[payload.measure];
        if (!prev[key]) {
            prev[key] = 0;
        }
        prev[key] += current[payload.dimension];
        return prev;
    }, {});

    let data_final = Object.keys(reduced).map(key => {
        return {
            [payload.dimension]: reduced[key],
            [payload.measure]: key
        };
    });

    let measuresOnly = data_final.map(x => x[payload.measure]);
    let dimensionOnly = data_final.map(x => x[payload.dimension]);
    let final = {
        measure: measuresOnly,
        dimension: dimensionOnly
    };
    console.log('final', final)
    return final;
});

/**
 * DOUGHNUT CHART AGGREGATION
 */
ipc.answerRenderer('load-doughnut-chart-agg', async (payload) => {
    let reduced = data.reduce((prev, current) => {
        let key = current[payload.measure];
        if (!prev[key]) {
            prev[key] = 0;
        }
        prev[key] += current[payload.dimension];
        return prev;
    }, {});

    let data_final = Object.keys(reduced).map(key => {
        return {
            value: reduced[key],
            name: key
        };
    });

    let measuresOnly = data_final.map(x => x.name);
    let final = {
        measure: measuresOnly,
        formatted: data_final
    };
    console.log('doughnut final', final)
    return final;
});

/**
 * SCATTER CHART AGGREGATION
 */
ipc.answerRenderer('load-scatter-chart-agg', async (payload) => {
    let formatted = data.map(x => [x[payload.dimension], x[payload.secondDimension]]);
    return formatted;
});

/**
 * CHART TYPE
 */
ipc.answerRenderer('load-chart-type', async (dimension, secondDimension) => {
    return ["bar", "pie", "line", "doughnut", "scatter"];
});

/**
 * LOAD CONFIG
 */
ipc.answerRenderer('load-config', async (dimension, secondDimension) => {
    return config;

});