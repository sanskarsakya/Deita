import { Table } from './../../../@core/models/table.model';
import { createAction, props } from '@ngrx/store';
// MODELS
import { Setting } from './../../../@core/models/app-setting.model';

// LOAD APP SETTING
export const LOAD_SETTINGS         = '[App] Load Setting';
export const LOAD_SETTINGS_SUCCESS = '[App] Load Setting Success';
export const LOAD_SETTINGS_FAIL    = '[App] Load Setting Fail';

export const LoadSetting = createAction(
    LOAD_SETTINGS,
    props<{ classId: number }>()
);

export const LoadSettingSuccess = createAction(
    LOAD_SETTINGS_SUCCESS,
    props<Setting>()
);

export const LoadSettingFail = createAction(
    LOAD_SETTINGS_FAIL,
    props<{ payload: any }>()
);


// AUTHENTICATION
export const SET_AUTHENTICATED         = '[App] Set Authenticated';
export const SET_AUTHENTICATED_SUCCESS = '[App] Set Authenticated Success';
export const SET_AUTHENTICATED_FAIL    = '[App] Set Authenticated Fail';

export const SetAuthenticated = createAction(
    SET_AUTHENTICATED,
    props<{ payload: { username: string, password: string } }>()
);

export const SetAuthenticatedSuccess = createAction(
    SET_AUTHENTICATED_SUCCESS,
);

export const SetAuthenticatedFail = createAction(
    SET_AUTHENTICATED_FAIL,
    props<{ payload: any }>()
);


// DATABASE CONNECTION
export const CREATE_CONNECTION         = '[App] Create Connection';
export const CREATE_CONNECTION_SUCCESS = '[App] Create Connection Success';
export const CREATE_CONNECTION_FAIL    = '[App] Create Connection Fail';

export const CreateConnection = createAction(
    CREATE_CONNECTION,
    props<{ payload: { client: string, host: string, port: string, user: string, password: string, database: string } }>()
);

export const CreateConnectionSuccess = createAction(
    CREATE_CONNECTION_SUCCESS,
);

export const CreateConnectionFail = createAction(
    CREATE_CONNECTION_FAIL,
    props<{ payload: any }>()
);


// SHOW CONNECTION MODAL
export const SHOW_CONNECTION_MODAL = '[App] Show Connection Modal';
export const HIDE_CONNECTION_MODAL = '[App] Hide Connection Modal';

export const ShowConnectionModal = createAction(
    SHOW_CONNECTION_MODAL
);
export const HideConnectionModal = createAction(
    HIDE_CONNECTION_MODAL
);

// DISCONNECT DATABASE CONNECTION
export const DISCONNECT_DATABASE = '[App] Disconnect Database';
export const DISCONNECT_DATABASE_SUCCESS = '[App] Disconnect Database Success';
export const DISCONNECT_DATABASE_FAIL = '[App] Disconnect Database Fail';

export const DisconnectDatabase = createAction(
    DISCONNECT_DATABASE
);

export const DisconnectDatabaseSuccess = createAction(
    DISCONNECT_DATABASE_SUCCESS
);
export const DisconnectDatabaseFail = createAction(
    DISCONNECT_DATABASE_FAIL,
    props<{ payload: any }>()
);



// TABLE LIST
export const FETCH_TABLES         = '[App] Fetch Tables';
export const FETCH_TABLES_SUCCESS = '[App] Fetch Tables Success';
export const FETCH_TABLES_FAIL    = '[App] Fetch Tables Fail';

export const FetchTable = createAction(
    FETCH_TABLES,
);

export const FetchTableSuccess = createAction(
    FETCH_TABLES_SUCCESS,
    props<{payload: Table[]}>()
);

export const FetchTableFail = createAction(
    FETCH_TABLES_FAIL,
    props<{ payload: any }>()
);
