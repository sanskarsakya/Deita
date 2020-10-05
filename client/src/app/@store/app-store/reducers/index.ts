import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAppSetting from './app.reducers';

export interface AppState {
    app: fromAppSetting.AppState
}

export const reducers: ActionReducerMap<AppState> = {
    app: fromAppSetting.reducer,
};

export const getAppSettingState = createFeatureSelector<AppState>(
    'app'
);
