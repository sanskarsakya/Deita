import * as fromChart from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

// MODELS
import { BarChartConfig } from './../../../@core/models/bar-chart.model';

export interface ChartState {
    entities  : { [id: number]: any };
    dimensions: string[],
    measures  : string[],
    loading   : boolean;
    loaded    : boolean;
}

export const initialState: ChartState = {
    entities  : {},
    dimensions: [],
    measures  : [],
    loading   : false,
    loaded    : false,
};

const chartReducer = createReducer(
    initialState,
    on(fromChart.LoadData, state => ({ ...state, loading: true })),
    on(fromChart.LoadDataSuccess, (state, payload) => {

        const entities = payload.data.reduce(
            (entities: { [id: number]: any }, data: any, index) => {
                return {
                    ...entities,
                    [index]: data,
                };
            },
            {}
        );

        const data_single = payload.data[0]
        let   keys        = Object.keys(data_single);

        let dimensions = [];
        let measures   = [];
        keys.forEach(key => {
            if (!isNaN(data_single[key])) {
                console.log(key)
                dimensions.push(key)
            } else {
                measures.push(key)
            }
        })

        return {
            ...state,
            loading: false,
            loaded : true,
            entities,
            dimensions,
            measures
        };
    }),
    on(fromChart.LoadDataFail, state => ({ ...state, loading: false, loaded: false, })),
);

export function reducer(state: ChartState | undefined, action: Action) {
    return chartReducer(state, action);
}

export const getChartEntities = (state: ChartState) => state.entities;
export const getChartLoading  = (state: ChartState) => state.loading;
export const getChartLoaded   = (state: ChartState) => state.loaded;
export const getDimensions    = (state: ChartState) => state.dimensions;
export const getMeasures      = (state: ChartState) => state.measures;