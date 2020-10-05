import { AppService } from './services/app.service';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deita';

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {

    this.appService.loadConfig()
      .subscribe(response => {
        this.config = response
      })
  }

  dbConnected: boolean;
  config: any;

  connectDatabase() {
    this.appService.connectDatabase()
      .subscribe(response => {
        console.log(response)
        this.dbConnected = true;
      }, catchError => this.dbConnected = false)
  }

  closeConnection(){
    this.dbConnected = false;
  }

  loadTable() {
    this.appService.loadTable()
      .subscribe((response) => {
        console.log(response)
      })
  }


  newChart() {
    this.config.push({
      chart: "",
      dimension: "",
      measure: ""
    })
  }
}
