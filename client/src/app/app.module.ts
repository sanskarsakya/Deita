import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ngrx imports
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule }            from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { reducers, effects, CustomSerializer } from "./@store/router-store";
import { environment } from '../environments/environment';

// not used in production
import { StoreDevtoolsModule }  from '@ngrx/store-devtools';
import { storeFreeze }          from 'ngrx-store-freeze';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NGRX MODULES
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
