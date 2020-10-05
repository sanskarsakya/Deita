import { Table } from './../../../@core/models/table.model';
import * as fromAppSetting from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

// MODELS
import { Setting } from './../../../@core/models/app-setting.model';

export interface AppState {
    isAuthenticated       : boolean,
    isAuthenticatedLoading: boolean,
    
    showConnectionModal      : boolean,
    connectDatabase          : boolean,
    connectDatabaseLoading   : boolean,
    disconnectDatabaseLoading: boolean,

    tables      : Table[],
    tableLoading: boolean,

    entity : Setting;
    loading: boolean;
    loaded : boolean;
}

export const initialState: AppState = {
    isAuthenticated       : false,
    isAuthenticatedLoading: false,

    showConnectionModal      : false,
    connectDatabase          : false,
    connectDatabaseLoading   : false,
    disconnectDatabaseLoading: false,

    tables      : [],
    tableLoading: false,

    entity: {
        theme: 'light'
    },
    loading: false,
    loaded : false,
};

const serviceReducer = createReducer(
    initialState,
    on(fromAppSetting.LoadSetting, state => ({ ...state, loading: true })),
    on(fromAppSetting.LoadSettingSuccess, (state, setting) => {

        return {
            ...state,
            loading: false,
            loaded : true,
            entity : setting,
        };
    }),
    on(fromAppSetting.LoadSettingFail, state => ({ ...state, loading: false, loaded: false, })),

    // AUTHENTICATION
    on(fromAppSetting.SetAuthenticated, state => ({ ...state, isAuthenticatedLoading: true })),
    on(fromAppSetting.SetAuthenticatedSuccess, state => ({ ...state, isAuthenticatedLoading: false, isAuthenticated: true })),
    on(fromAppSetting.SetAuthenticatedFail, state => ({ ...state, isAuthenticatedLoading: false, isAuthenticated: false })),

    // DATABASE CONNECTION
    on(fromAppSetting.ShowConnectionModal, state => ({ ...state, showConnectionModal: true })),
    on(fromAppSetting.HideConnectionModal, state => ({ ...state, showConnectionModal: false })),
    on(fromAppSetting.CreateConnection, state => ({ ...state, connectDatabaseLoading: true })),
    on(fromAppSetting.CreateConnectionSuccess, state => ({ ...state, connectDatabaseLoading: false, connectDatabase: true, showConnectionModal: false })),
    on(fromAppSetting.CreateConnectionFail, state => ({ ...state, connectDatabaseLoading: false, connectDatabase: false })),
    
    // DISCONNECT DATABASE CONNECTION
    on(fromAppSetting.DisconnectDatabase, state => ({ ...state, disconnectDatabaseLoading: true })),
    on(fromAppSetting.DisconnectDatabaseSuccess, state => ({ ...state, disconnectDatabaseLoading: false, connectDatabase: false })),
    on(fromAppSetting.DisconnectDatabaseFail, state => ({ ...state, disconnectDatabaseLoading: false, connectDatabase: false })),
    
    // FETCH TABLES
    on(fromAppSetting.FetchTable, state => ({ ...state, tableLoading: true })),
    on(fromAppSetting.FetchTableSuccess, (state, payload) => ({ ...state, tableLoading: false, tables: payload.payload })),
    on(fromAppSetting.FetchTableFail, state => ({ ...state, disconnectDatabaseLoading: false })),

);

export function reducer(state: AppState | undefined, action: Action) {
    return serviceReducer(state, action);
}

export const getSettingEntity  = (state: AppState) => state.entity;
export const getSettingLoading = (state: AppState) => state.loading;
export const getSettingLoaded  = (state: AppState) => state.loaded;

export const getIsAuthenticated        = (state: AppState) => state.isAuthenticated;
export const getIsAuthenticatedLoading = (state: AppState) => state.isAuthenticatedLoading;

export const getShowConnectionModal       = (state: AppState) => state.showConnectionModal;
export const getconnectDatabase           = (state: AppState) => state.connectDatabase;
export const getconnectDatabaseLoading    = (state: AppState) => state.connectDatabaseLoading;
export const getdisconnectDatabaseLoading = (state: AppState) => state.disconnectDatabaseLoading;

export const getTables = (state: AppState) => state.tables;