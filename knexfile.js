module.exports = {
    test: {
      client: 'pg',
      connection: 'postgres://localhost/test_db'
    },
    development: {
      client: 'sqlite3',
      connection: {
        filename: './pzt.pz'
      },
      pool: {
        afterCreate: function (conn, done) {
          conn.run("PRAGMA cipher_compatibility = 3")
          conn.run("PRAGMA KEY = 'secret'");
          done();
        }
      },
      useNullAsDefault: true,
      // migrations: {
      //   directory: './migrations',
      // },
      // seeds: {
      //   directory: './seeds'
      // }
    },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }
  }
  