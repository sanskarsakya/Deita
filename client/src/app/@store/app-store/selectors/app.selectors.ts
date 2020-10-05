import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAppSetting from '../reducers/app.reducers';

export const getSettingsState = createSelector(
    fromFeature.getAppSettingState,
    (state: fromFeature.AppState) => state.app
);

export const getSetting = createSelector(
    getSettingsState,
    fromAppSetting.getSettingEntity
);

export const getSettingLoaded = createSelector(
    getSettingsState,
    fromAppSetting.getSettingLoaded
);

export const getSettingLoading = createSelector(
    getSettingsState,
    fromAppSetting.getSettingLoading
);

export const getAuthenticated = createSelector(
    getSettingsState,
    fromAppSetting.getIsAuthenticated
);

export const getConnectDatabase = createSelector(
    getSettingsState,
    fromAppSetting.getconnectDatabase
);

export const getConnectDatabaseLoading = createSelector(
    getSettingsState,
    fromAppSetting.getconnectDatabaseLoading
);

export const getShowConnectModal = createSelector(
    getSettingsState,
    fromAppSetting.getShowConnectionModal
);

export const getdisConnectDatabaseLoading = createSelector(
    getSettingsState,
    fromAppSetting.getdisconnectDatabaseLoading
);


export const getTables = createSelector(
    getSettingsState,
    fromAppSetting.getTables
);

