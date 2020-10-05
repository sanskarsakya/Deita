"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamIpc = void 0;
const electron_better_ipc_1 = require("electron-better-ipc");
const Knex = require("Knex");
class ExamIpc {
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('test:test');
            return { message: 'test endpoint success' };
        });
    }
    authenticate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('authenticate:post', payload);
            if (payload.username === 'puzan' && payload.password === 'sakya') {
                return { message: 'login success' };
            }
            throw ('Error login');
        });
    }
    connect_database(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('database:connect', payload);
                let connection = {
                    client: payload.client,
                    connection: {
                        host: payload.host,
                        port: payload.port,
                        user: payload.user,
                        password: payload.password,
                        database: payload.database,
                        charset: 'utf8',
                        debug: true
                    }
                };
                this.db = Knex(connection);
                return { message: 'Database connection successful' };
            }
            catch (error) {
                console.log(error.message);
                throw (error);
            }
        });
    }
    disconnect_database() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('database:disconnect');
                this.db.destroy();
                return { message: 'Database disconnected.' };
            }
            catch (error) {
                console.log(error.message);
                throw (error);
            }
        });
    }
    get_table_list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('database:table_list');
                let response = yield this.db.raw(`SELECT tablename FROM pg_tables WHERE schemaname='public'`);
                console.log(response.rows);
                return { data: response.rows };
            }
            catch (error) {
                console.log(error.message);
                throw (error);
            }
        });
    }
    listen() {
        electron_better_ipc_1.ipcMain.answerRenderer('test:test', () => this.test());
        electron_better_ipc_1.ipcMain.answerRenderer('authenticate:post', (payload) => this.authenticate(payload));
        electron_better_ipc_1.ipcMain.answerRenderer('database:connect', (payload) => this.connect_database(payload));
        electron_better_ipc_1.ipcMain.answerRenderer('database:disconnect', () => this.disconnect_database());
        electron_better_ipc_1.ipcMain.answerRenderer('database:table_list', () => this.get_table_list());
    }
}
exports.ExamIpc = ExamIpc;
exports.default = new ExamIpc();
//# sourceMappingURL=db.ipc.js.map