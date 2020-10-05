import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCharts from './chart.reducers';

export interface ChartState {
    chart: fromCharts.ChartState
}

export const reducers: ActionReducerMap<ChartState> = {
    chart: fromCharts.reducer,
};

export const getChartState = createFeatureSelector<ChartState>(
    'chart'
);
