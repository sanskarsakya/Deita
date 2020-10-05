import { Injectable } from '@angular/core';

import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as chartActions from '../actions/chart.actions';
import * as fromServices from '../../../@core/services';

@Injectable()
export class ChartsEffects {
    constructor(
        private actions$: Actions,
        private chartService: fromServices.ChartService
    ) { }

    // loadCharts$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(chartActions.LOAD_DATA),
    //         switchMap(({ payload }) => {
    //             return this.chartService
    //                 .getChartData()
    //                 .pipe(
    //                     map(data => {
    //                         return chartActions.LoadDataSuccess({data: data})
    //                     }),
    //                     catchError(error => of(chartActions.LoadDataFail(error)))
    //                 )
    //         })
    //     )
    // );


}


