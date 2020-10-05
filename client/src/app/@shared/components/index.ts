import { LoadingComponent } from './loading/loading.component';
import { ScatterPlot3dComponent } from './scatter-plot-3d/scatter-plot-3d.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

export const components: any[] = [
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterPlotComponent,
    ScatterPlot3dComponent,
    LoadingComponent
];

export * from './scatter-plot-3d/scatter-plot-3d.component';
export * from './scatter-plot/scatter-plot.component';
export * from './pie-chart/pie-chart.component';
export * from './line-chart/line-chart.component';
export * from './bar-chart/bar-chart.component';
export * from './loading/loading.component';
