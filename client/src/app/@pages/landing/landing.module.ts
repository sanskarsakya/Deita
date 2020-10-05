import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// SHARED
import { SharedModule } from './../../@shared/shared.module';

// CONTAINERS
import * as fromContainers from './containers';

// GUARDS
import * as fromGuards from './guards';

// NG-ZORRO
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

// STORE
import { AppStoreModule } from './../../@store/app-store/app-store.module';
import { ChartStoreModule } from './../../@store/chart-store/chart-store.module';


export const ROUTES: Routes = [] = [
  {
    path       : '',
    // canActivate: [fromGuards.AuthGuard],
    component  : fromContainers.PlaygroundComponent
  },
  {
    path       : 'login',
    component  : fromContainers.LoginComponent
  },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,

    // ng-zorro
    NzModalModule,
    NzPopoverModule,

    // store
    AppStoreModule,
    ChartStoreModule
  ],
  declarations: [...fromContainers.containers],
  providers   : [...fromGuards.guards]
})
export class LandingModule { }
