import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

// MODELS
import { Table } from './../models/table.model';
import { ResponseWrapper } from './../models/response.model';

const { ipcRenderer: ipc } = (<any>window).require('electron-better-ipc');

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  connectDatabase(): Observable<any> {
    let databaseConfig = {
      client: 'postgres',
      connection: {
        host: '0.0.0.0',
        // host: 'db',
        port: '5432',
        user: 'postgres',
        password: 'postgres',
        database: 'waqt',
        charset: 'utf8',
        debug: true
      }
    }
    return from(ipc.callMain('connect-database', databaseConfig))
      .pipe(
        catchError((error: any) => throwError(error)));
  }

  loadTable(): Observable<ResponseWrapper<Table>> {
    return from(ipc.callMain('load-table'))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
 
  loadDimensionAndMeasure(tablename): Observable<any> {
    return from(ipc.callMain('load-dimension-measure', tablename))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  
  loadChartType(): Observable<ResponseWrapper<string>> {
    return from(ipc.callMain('load-chart-type'))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  
  pie_chart_agg(measure, dimension): Observable<any> {
    return from(ipc.callMain('load-pie-chart-agg', {measure: measure, dimension: dimension}))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  
  bar_chart_agg(measure, dimension): Observable<any> {
    return from(ipc.callMain('load-bar-chart-agg', {measure: measure, dimension: dimension}))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  
  doughnut_chart_agg(measure, dimension): Observable<any> {
    return from(ipc.callMain('load-doughnut-chart-agg', {measure: measure, dimension: dimension}))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  
  scatter_chart_agg(dimension, secondDimension): Observable<any> {
    return from(ipc.callMain('load-scatter-chart-agg', {dimension: dimension, secondDimension: secondDimension}))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  
  loadConfig(): Observable<any> {
    return from(ipc.callMain('load-config'))
      .pipe(catchError((error: any) => Observable.throw(error.json())));

  }

  


}
