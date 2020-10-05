import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as appActions from '../actions/';
import * as fromServices from '../../../@core/services';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private chartService: fromServices.ChartService,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    // loadCharts$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(appActions.SET_AUTHENTICATED),
    //         switchMap(({payload}) => {
    //             console.log('AppEffects:loadCharts', payload)
    //             return this.chartService
    //                 .authenticate(payload)
    //                 .pipe(
    //                     map((data) => {
    //                         console.log('AppEffects:SetAuthenticatedSuccess')
    //                         this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
    //                         return appActions.SetAuthenticatedSuccess()
    //                     }),
    //                     catchError(error => of(appActions.SetAuthenticatedFail(error)))
    //                 )
    //         })
    //     )
    // );
   
    // /**
    //  * create new connection to the database
    //  */
    // connectDatabase$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(appActions.CREATE_CONNECTION),
    //         switchMap(({payload}) => {
    //             console.log('AppEffects:connectDatabase', payload)
    //             return this.chartService
    //                 .connect_database(payload)
    //                 .pipe(
    //                     map((data) => {
    //                         console.log('AppEffects:CreateConnectionSuccess', data)
    //                         return appActions.CreateConnectionSuccess()
    //                     }),
    //                     catchError(error => {
    //                         console.log('AppEffects:CreateConnectionFail')
    //                         return of(appActions.CreateConnectionFail(error))
    //                     })
    //                 )
    //         })
    //     )
    // );
    
    /**
     * disconnect from the existing database connection
     */
    // disconnectDatabase$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(appActions.DISCONNECT_DATABASE),
    //         switchMap(({payload}) => {
    //             console.log('AppEffects:disconnectDatabase', payload)
    //             return this.chartService
    //                 .connect_database(payload)
    //                 .pipe(
    //                     map((data) => {
    //                         console.log('AppEffects:disconnectDatabaseSuccess', data)
    //                         return appActions.DisconnectDatabaseSuccess()
    //                     }),
    //                     catchError(error => {
    //                         console.log('AppEffects:disconnectDatabaseFail')
    //                         return of(appActions.DisconnectDatabaseFail(error))
    //                     })
    //                 )
    //         })
    //     )
    // );
   
    /**
     * FETCH DATABASE TABLES
     */
    // fetchTables$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(appActions.FETCH_TABLES),
    //         switchMap(() => {
    //             console.log('AppEffects:fetchTables')
    //             return this.chartService
    //                 .get_table_list()
    //                 .pipe(
    //                     map((data) => {
    //                         console.log('AppEffects:fetchTablesSuccess', data)
    //                         return appActions.FetchTableSuccess({payload: data})
    //                     }),
    //                     catchError(error => {
    //                         console.log('AppEffects:fetchTablesFail')
    //                         return of(appActions.FetchTableFail(error))
    //                     })
    //                 )
    //         })
    //     )
    // );

}


