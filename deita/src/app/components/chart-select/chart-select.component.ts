import { AppService } from './../../services/app.service';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'chart-select',
  templateUrl: './chart-select.component.html',
  styleUrls: ['./chart-select.component.scss']
})
export class ChartSelectComponent implements OnInit {

  @Input() selectedChart: any;
  
  charts;

  @Output() onChartChange: EventEmitter<string> = new EventEmitter();
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.loadChartType()
    .subscribe(response => {
      this.charts = response
    });


  }

  onSelectChange(e) {
    this.onChartChange.emit(e.target.value);
  }
}
