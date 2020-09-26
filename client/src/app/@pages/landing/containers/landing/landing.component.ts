import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  selected_chart_type:number = null;

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

}
