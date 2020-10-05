import { Component, Input, OnInit } from '@angular/core';

// MODELS
import { BarChartConfig } from './../../../@core/models/bar-chart.model';


// STORE
import { Store } from '@ngrx/store';
import * as fromChartStore from '../../../@store/chart-store';

// RXJS
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  options: any;
  @Input() editMode: boolean = false;
  @Input() data: BarChartConfig;

  measures$: Observable<string[]>;
  dimensions$: Observable<string[]>;

  // dimensionsData$: Observable<number[]>;
  // measuresData$: Observable<string[]>;
  dimensionsData$: number[] = [];
  measuresData$: string[] = [];

  dimensions: any[];
  selectedDimension = null;
  selectedMeasure = null;

  constructor(
    private chartStore: Store<fromChartStore.ChartState>,
  ) { }

  ngOnInit(): void {
    console.log('BarChartComponent: init');

    // SELECTORS
    this.dimensions$ = this.chartStore.select(fromChartStore.getDimensions)
    this.measures$ = this.chartStore.select(fromChartStore.getMeasures)

  }

  onDimensionChange() {
    console.log(this.selectedDimension)
    this.chartStore.select(fromChartStore.getDataByDimension, { dimension: this.selectedDimension }).subscribe(s => {
      this.dimensionsData$ = s
      this.options = this.getOptions(this.measuresData$, this.dimensionsData$)
    })
  }

  onMeasureChange() {
    console.log(this.selectedMeasure)
    this.chartStore.select(fromChartStore.getDataByMeasure, { measure: this.selectedMeasure }).subscribe(s => {
      this.measuresData$ = s
      this.options = this.getOptions(this.measuresData$, this.dimensionsData$)
    })

  }


  getOptions(measuresData, dimensionsData) {
    return {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: measuresData || [],
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Category',
          type: 'bar',
          data: dimensionsData || [],
          animationDelay: (idx) => idx * 10,
        },
        // {
        //   name: 'bar2',
        //   type: 'bar',
        //   data: data2,
        //   animationDelay: (idx) => idx * 10 + 100,
        // },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}
