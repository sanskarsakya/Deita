import { createAction, props } from '@ngrx/store';
// MODELS
import { Setting } from './../../../@core/models/app-setting.model';

// LOAD APP SETTING
export const LOAD_DATA          = '[Chart] Load Data';
export const LOAD_DATA_SUCCESS  = '[Chart] Load Data Success';
export const LOAD_DATA_FAIL     = '[Chart] Load Data Fail';

export const LoadData = createAction(
    LOAD_DATA
);

export const LoadDataSuccess = createAction(
    LOAD_DATA_SUCCESS,
    props<{data:any[]}>()
);

export const LoadDataFail = createAction(
    LOAD_DATA_FAIL,
    props<{payload: any}>()
);