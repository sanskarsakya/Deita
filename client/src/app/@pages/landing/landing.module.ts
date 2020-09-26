import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// SHARED
import { SharedModule } from './../../@shared/shared.module';

// CONTAINERS
import * as fromContainers from './containers';

export const ROUTES: Routes = [] = [
  {
    path:'',
    component: fromContainers.LandingComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [...fromContainers.containers]
})
export class LandingModule { }
