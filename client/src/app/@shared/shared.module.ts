import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// STORE
import { ChartStoreModule } from './../@store/chart-store/chart-store.module';

// NGX-E-CHARTS
import { NgxEchartsModule } from 'ngx-echarts';

// COMPONENTS
import * as fromComponents from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

    ChartStoreModule
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class SharedModule { }
