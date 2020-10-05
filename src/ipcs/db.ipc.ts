import { ipcMain } from 'electron-better-ipc';
import * as Knex from 'Knex';

export class ExamIpc {

    db: any;

    public async test(): Promise<any> {

        console.log('test:test')
        return { message: 'test endpoint success' };
    }

    public async authenticate(payload: { username: string, password: string }): Promise<any> {

        console.log('authenticate:post', payload)
        if (payload.username === 'puzan' && payload.password === 'sakya') {
            return { message: 'login success' };
        }

        throw ('Error login');

    }

    public async connect_database(
        payload: {
            client  : string,
            host    : string,
            port    : string,
            user    : string,
            password: string,
            database: string,
        }
    ): Promise<any> {
        try {
            console.log('database:connect', payload)
            let connection = {
                client    : payload.client,
                connection: {
                    host    : payload.host,
                    port    : payload.port,
                    user    : payload.user,
                    password: payload.password,
                    database: payload.database,
                    charset : 'utf8',
                    debug   : true
                }
            }


            this.db = Knex(connection);
            return { message: 'Database connection successful' };


        } catch (error) {
            console.log(error.message)
            throw (error);
        }


    }

    public async disconnect_database(): Promise<any> {
        try {
            console.log('database:disconnect')
            this.db.destroy();

            return { message: 'Database disconnected.' };

        } catch (error) {
            console.log(error.message)
            throw (error);
        }

    }
   
    public async get_table_list(): Promise<any> {
        try {
            console.log('database:table_list')
            let response = await this.db.raw(`SELECT tablename FROM pg_tables WHERE schemaname='public'`);
            console.log(response.rows);
            return { data: response.rows };

        } catch (error) {
            console.log(error.message)
            throw (error);
        }

    }

    public listen() {
        ipcMain.answerRenderer('test:test', () => this.test());
        ipcMain.answerRenderer('authenticate:post', (payload: { username: string, password: string }) => this.authenticate(payload));
        ipcMain.answerRenderer('database:connect', (payload: { client: string, host: string, port: string, user: string, password: string, database: string }) => this.connect_database(payload));
        ipcMain.answerRenderer('database:disconnect', () => this.disconnect_database());
        ipcMain.answerRenderer('database:table_list', () => this.get_table_list());
    }

}
export default new ExamIpc();
