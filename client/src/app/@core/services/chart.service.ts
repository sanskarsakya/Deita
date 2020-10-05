import { cupcakes } from './../../@data/cupcake';
import { pie_chart } from './../../@data/pie_chart';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import isElectron from 'is-electron';

// if(isElectron){
// }
// const { ipcRenderer: ipc } = (<any>window).require('electron-better-ipc');

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {


    if (isElectron()) {
      console.log("Electron aww yeahhh !");

    } else {
      console.log("Running in other platform as a normal browser");
    }

  }

  getChartData(): Observable<any[]> {
    return of(pie_chart)
      .pipe(catchError((error: any) => throwError(error)));
  }

  // authenticate(payload: { username: string, password: string }): Observable<any> {
  //   if (isElectron) {

  //     console.log('service:authenticate', payload)
  //     return from(ipc.callMain('authenticate:post', { username: payload.username, password: payload.password }))
  //       .pipe(catchError((error: any) => Observable.throw(error.json())));

  //   }
  //   return null

  // }

  // connect_database(payload: { username: string, password: string }): Observable<any> {

  //   console.log('connect_database', payload)
  //   return from(ipc.callMain('database:connect', payload))
  //     .pipe(
  //       tap(x => console.log(x)),
  //       catchError((error: any) => Observable.throw(error.json()))
  //     );

  // }
 
  // disconnect_database(): Observable<any> {
  //   console.log('disconnect_database')
  //   return from(ipc.callMain('database:disconnect'))
  //     .pipe(
  //       tap(x => console.log(x)),
  //       catchError((error: any) => Observable.throw(error.json()))
  //     );
  // }
 
  // get_table_list(): Observable<any> {
  //   console.log('get_table_list')
  //   return from(ipc.callMain('database:table_list'))
  //     .pipe(
  //       tap(x => console.log(x)),
  //       catchError((error: any) => Observable.throw(error.json()))
  //     );
  // }

}


