import { Component, OnInit } from '@angular/core';


// STORE
import { Store } from '@ngrx/store';
import * as fromChartStore from '../../../@store/chart-store';

// RXJS
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  options: any;

  pie_data$: any;

  measures$: Observable<string[]>;
  dimensions$: Observable<string[]>;

  selectedDimension = null;
  selectedMeasure = null;

  constructor(
    private chartStore: Store<fromChartStore.ChartState>,
  ) { }

  ngOnInit() {
    console.log('PieChartComponent: init')

    // SELECTORS
    this.dimensions$ = this.chartStore.select(fromChartStore.getDimensions)
    this.measures$ = this.chartStore.select(fromChartStore.getMeasures)
    // this.pie_data$ = 
    // this.chartStore.select(fromChartStore.getAggDataByDimension, {dimension:this.selectedDimension, measure: this.selectedMeasure})
    // .subscribe(d => {
    //   // this.options = this.option1();
    //   this.options = this.option2(d);
    // });


  }

  
  onSelectChange() {
    console.log(this.selectedDimension)
    if(this.selectedDimension && this.selectedMeasure){
      this.chartStore.select(fromChartStore.getAggDataByDimension, {dimension:this.selectedDimension, measure: this.selectedMeasure})
      .subscribe(s => {
        console.log(s)
        this.options = this.option2(s)
      })
    }
  }

  // onMeasureChange() {
  //   console.log(this.selectedMeasure)
  //   this.chartStore.select(fromChartStore.getDataByMeasure, { measure: this.selectedMeasure }).subscribe(s => {
  //     this.measuresData$ = s
  //     this.options = this.getOptions(this.measuresData$, this.dimensionsData$)
  //   })

  // }

  option1() {
    let data = this.genData(50);
    return {
      title: {
        text: '同名数量统计',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,

        selected: data.selected
      },
      series: [
        {
          name: 'Test',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelayUpdate: () => Math.random() * 200,
    };
  }

  option2(data) {
    return {
      backgroundColor: '#2c343c',

      title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'days',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: data.sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelayUpdate: () => Math.random() * 200,
        }
      ]
    };
  }
  genData(count) {
    var nameList = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < count; i++) {
      let name = Math.random() > 0.65
        ? makeWord(4, 1) + '·' + makeWord(3, 0)
        : makeWord(2, 1);
      legendData.push(name);
      seriesData.push({
        name: name,
        value: Math.round(Math.random() * 100000)
      });
      selected[name] = i < 6;
    }

    return {
      legendData: legendData,
      seriesData: seriesData,
      selected: selected
    };

    function makeWord(max, min) {
      var nameLen = Math.ceil(Math.random() * max + min);
      var name = [];
      for (var i = 0; i < nameLen; i++) {
        name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
      }
      return name.join('');
    }
  }


}
