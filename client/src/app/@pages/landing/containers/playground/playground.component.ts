import { Table } from './../../../../@core/models/table.model';
import { ChartService } from './../../../../@core/services/chart.service';
import { Component, OnInit } from '@angular/core';

// STORE
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../../../@store/app-store';
import * as fromChartStore from '../../../../@store/chart-store';

// RXJS
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

// MODELS
import { Setting } from './../../../../@core/models/app-setting.model';
import { BarChartConfig } from './../../../../@core/models/bar-chart.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  loading$: Observable<boolean>;
  setting$: Observable<Setting>;

  showConnectionModal$: Observable<boolean>;
  connectDatabase$: Observable<boolean>;
  tables$: Observable<Table[]>;

  barChartData: BarChartConfig = {};

  constructor(
    private appStore: Store<fromAppStore.AppState>,
    private chartStore: Store<fromChartStore.ChartState>,
    private chartService: ChartService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.chartStore.dispatch(fromChartStore.LoadData());

    // this.chartService.authenticate()
    // .subscribe(x => {
    //   console.log('ipcpayload', x)
    // })

    // let label = [];
    // let data = [];
    // for (let i = 0; i < 100; i++) {
    //   label.push('category' + i)
    //   data.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)

    // }
    // this.barChartData = {
    //   ... this.barChartData
    //   , xAxisData: label
    //   , data1: data
    // };

    // selectors
    this.loading$ = this.appStore.select(fromAppStore.getSettingLoading);
    this.setting$ = this.appStore.select(fromAppStore.getSetting);
    this.connectDatabase$ = this.appStore.select(fromAppStore.getConnectDatabase);
     
    this.tables$ = this.appStore.select(fromAppStore.getTables);
    // this.showConnectionModal$ = 
    this.appStore.select(fromAppStore.getShowConnectModal)
      .subscribe(x => this.isVisible = x);

    // this.chartStore.select(fromChartStore.getCharts)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.barChartData = data.map(d => {
    //       return {
    //         xAxisData: d['Month'],
    //         data1: d['Cupcake']
    //       }
    //     })
    //     console.log(this.barChartData)
    //   })
  }

  // modal configs
  isVisible = false;

  showModal(): void {
    this.appStore.dispatch(fromAppStore.ShowConnectionModal());
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    // this.isVisible = false;
    this.appStore.dispatch(fromAppStore.HideConnectionModal());
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.appStore.dispatch(fromAppStore.HideConnectionModal());
    // this.isVisible = false;
  }

  // handle connection click
  form = this.fb.group({
    client: ['', Validators.required],
    host: ['', Validators.required],
    port: ['', Validators.required],
    user: ['', Validators.required],
    password: ['', Validators.required],
    database: ['', Validators.required],
  });

  get f() { return this.form.controls; }

  connect(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      console.log('connect', value);
      this.appStore.dispatch(fromAppStore.CreateConnection({ payload: value }));
    }
  }

  loadTable(){
    this.appStore.dispatch(fromAppStore.FetchTable());
  }

}
