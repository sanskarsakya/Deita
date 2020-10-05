import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'dimension-measure-select',
  templateUrl: './dimension-select.component.html',
  styleUrls  : ['./dimension-select.component.scss']
})
export class DimensionAndMeasureSelectComponent implements OnInit {

  @Input() chartType;
  dimensions;
  measures;

  @Output() onDimensionChange: EventEmitter<string>       = new EventEmitter();
  @Output() onSecondDimensionChange: EventEmitter<string> = new EventEmitter();
  @Output() onMeasureChange: EventEmitter<string>         = new EventEmitter();

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.loadDimensionAndMeasure('datasets')
      .subscribe((response) => {
        this.dimensions = response.dimensions;
        this.measures   = response.measures;
      })
  }

  onDimensionSelectChange(e) {
    this.onDimensionChange.emit(e.target.value);
  }

  onSecondDimensionSelectChange(e) {
    this.onSecondDimensionChange.emit(e.target.value);
  }

  onMeasureSelectChange(e) {
    this.onMeasureChange.emit(e.target.value);
  }
}
