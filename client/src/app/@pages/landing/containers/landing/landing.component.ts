import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  test_data = {
    xAxisData: ['sun', 'mon', 'tue'],
    data1: [1,3,5],

  }

  data_config = [
    {
      id: 1,
      type: 1,
      
    },
    {
      id: 2,
      type: 2,
    },
    {
      id: 3,
      type: 3,
    }
  ]

  selected_chart_type: number = null;

  // chart Names
  chart_types: any = [
    {
      id: 1,
      name: 'Bar Chart'
    },
    {
      id: 2,
      name: 'Line Chart'
    },
    {
      id: 3,
      name: 'Pie Chart'
    },
    {
      id: 4,
      name: 'Scatter Plot Chart'
    },
    {
      id: 5,
      name: '3D Scatter Plot Chart'
    }
  ]

  // form = this.fb.group({
  //   chart_type: ['', Validators.required]
  // });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  // get f() { return this.form.controls; }

  onChartTypeChange() {
    console.log(this.selected_chart_type)
  }

  onSubmit() {

  }
  isVisible
  showModal(): void {
    this.isVisible = true;
  }
  handleModalClose(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  // popover setting
  popoverVisible
  clickMe(chart_type): void {
    this.selected_chart_type = chart_type;
    this.popoverVisible = false;
    this.isVisible = true;
  }

  change(value: boolean): void {
    console.log(value);
  }

}


/***
 * json
 * iterate
 * component type
 * component data
 * create chart
 * open chart into modal
 * auto save config
 * chart book
 * display into chart book
 * dimensions
 * measures
 *
 */