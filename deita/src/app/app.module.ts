import { ChartSelectComponent } from './components/chart-select/chart-select.component';
import { MeasureSelectComponent } from './components/measure-select/measure-select.component';
import { ChartComponent } from './components/chart/chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DimensionAndMeasureSelectComponent } from './components/dimension-measure-select/dimension-measure-select.component';

import { NgxEchartsModule } from "ngx-echarts";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DimensionAndMeasureSelectComponent,
    MeasureSelectComponent,
    ChartSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts")
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
