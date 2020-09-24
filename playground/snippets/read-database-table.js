// toc
// [x] 1. establish database connection with knex (10 points)
// [x] 2. List all the tables in the connected database (10 points)
// [x] 3. Seperate numbers as dimensions and labels as measures (10 points)
// [x] 4. Create function to reconnect to the database (10 points)
// [x] 5. Create function to disconnect the database (10 points)
// [x] 6. List all the columns and their types in the selected table (10 points)

// 1.
// variables
const DB_CONNECTION_SUCCESS_MESSAGE = 'Database connection successful';
const DB_CONNECTION_FAILURE_MESSAGE = 'Database connection failed';


// 4.
const environment_configs = {
    test: {
        client: 'pg',
        connection: 'postgres://localhost/test_db'
    },
    development: {
        client: 'postgres',
        connection: {
            host: '0.0.0.0',
            // host: 'db',
            port: '5432',
            user: 'postgres',
            password: 'postgres',
            database: 'waqt',
            charset: 'utf8',
            debug: true
        }
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
}

const environment = process.env.NODE_ENV || 'development'; // environment arrays
const config = environment_configs[environment]; // environment selection

const Knex = require('knex');
const { Model } = require('objection');

const db = Knex(config); // db knex instance
Model.knex(db); // pass db instance to objection

console.log('testing connection');

db.raw('select 1+1 as result')
    .then(d => {
        console.log(DB_CONNECTION_SUCCESS_MESSAGE);
    }).catch(err => {
        console.log(err);
    });


// 2.
db.raw(`SELECT tablename FROM pg_tables WHERE schemaname='public'`)
    .then(d => {
        console.log(d.rows);
    }).catch(err => {
        console.log(err);
    });

// 6 and 3.
let dimensions = [];
let measures = [];
db.raw(`select column_name, data_type from information_schema.columns where table_name='fb_users';`)
    .then(d => {
        let rows = d.rows;
        // console.log(rows);
        // test it number type
        rows.forEach(row => {
            if (row.data_type === 'integer') {
                dimensions.push(row);
            } else {
                measures.push(rows)
            }
        });

        console.log('dimensions', dimensions);
        console.log('measures', measures);
    })
    .catch(err => {
        console.log(err);
    });



// 5.    
const knex_close = () => {
    db.destroy();
}
// knex_close();