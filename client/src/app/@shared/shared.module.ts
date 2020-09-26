import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NGX-E-CHARTS
import { NgxEchartsModule } from 'ngx-echarts';

// COMPONENTS
import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class SharedModule { }
