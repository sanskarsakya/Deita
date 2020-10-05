import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCharts from '../reducers/chart.reducers';

export const getChartsState = createSelector(
    fromFeature.getChartState,
    (state: fromFeature.ChartState) => state.chart
);

export const getChartsEntities = createSelector(
    getChartsState,
    fromCharts.getChartEntities
);

export const getCharts = createSelector(
    getChartsEntities,
    entities => {
        return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
    }
);

export const getChartLoaded = createSelector(
    getChartsState,
    fromCharts.getChartLoaded
);

export const getChartLoading = createSelector(
    getChartsState,
    fromCharts.getChartLoading
);

export const getDimensions = createSelector(
    getChartsState,
    fromCharts.getDimensions
);

export const getMeasures = createSelector(
    getChartsState,
    fromCharts.getMeasures
);

export const getDataByMeasure = createSelector(
    getCharts,
    (data, props) => data.map(d => d[props.measure])
);

export const getDataByDimension = createSelector(
    getCharts,
    (data, props) => data.map(d => d[props.dimension])
);


export const getAggDataByDimension = createSelector(
    getCharts,
    (data, props) => {
        let reduced = data.reduce((prev, current) => {
            let key = current[props.measure];
            if (!prev[key]) {
                prev[key] = 0;
              }
            prev[key] +=current[props.dimension];
              return prev
          },{});
          
          let final = Object.keys(reduced).map(key => {
            return {
                [props.dimension]: reduced[key],
                name: key,
            }
          })
        
          return final;
    }

);

