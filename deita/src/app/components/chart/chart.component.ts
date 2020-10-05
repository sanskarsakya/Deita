import { AppService } from './../../services/app.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() config: any;
  @Input() dbConnected: boolean;

  options: any;

  selectedDimension;
  selectedSecondDimension;
  selectedMeasure;
  selectedChart;

  constructor(private appService: AppService) { }

  ngOnInit() {
    if (this.config) {
      this.selectedDimension = this.config.dimension;
      this.selectedMeasure = this.config.measure;
      this.selectedChart = this.config.chart;
      if (this.config.secondDimension) {
        this.selectedSecondDimension = this.config.secondDimension;
      }
      this.renderChart();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("config", this.config);
    if (this.config) {
      this.selectedDimension = this.config.dimension;
      this.selectedMeasure = this.config.measure;
      this.selectedChart = this.config.chart;
      if (this.config.secondDimension) {
        this.selectedSecondDimension = this.config.secondDimension;
      }
      this.renderChart();
    }
  }

  handleDimensionChange(e) {
    this.selectedDimension = e;
    this.renderChart();
  }
  handleSecondDimensionChange(e) {
    this.selectedSecondDimension = e;
    this.renderChart();
  }
  handleMeasureChange(e) {
    this.selectedMeasure = e;
    this.renderChart();
  }
  handleChartChange(e) {
    this.selectedChart = e;
    this.renderChart();
  }

  renderChart() {
    if (this.selectedDimension && this.selectedMeasure && this.selectedChart) {
      if (this.selectedChart === "pie") {
        this.appService.pie_chart_agg(this.selectedMeasure, this.selectedDimension)
        .subscribe(response => {
          let o = this.getPieOption(response);
          this.options = o;
        })
      
      }
      if (this.selectedChart === "bar") {
        this.appService.bar_chart_agg(this.selectedMeasure, this.selectedDimension)
        .subscribe(response => {
          let o = this.getBarOption(response);
          this.options = o;
        })
      }
      if (this.selectedChart === "line") {
        this.appService.bar_chart_agg(this.selectedMeasure, this.selectedDimension)
        .subscribe(response => {
          let o = this.getLineOptions(response);
          this.options = o;
        })
      }
      if (this.selectedChart === "doughnut") {
        this.appService.doughnut_chart_agg(this.selectedMeasure, this.selectedDimension)
        .subscribe(response => {
          let o = this.getDoughnutCOptions(response);
          this.options = o;
        })
      }
      if (this.selectedChart === "scatter") {
        this.appService.scatter_chart_agg(this.selectedDimension, this.selectedSecondDimension)
        .subscribe(response => {
          let o = this.getScatterOptions(response);
          this.options = o;
        })
      }
    }
  }

  getPieOption(data) {
    return {
      backgroundColor: "#fff",

      title: {
        text: "Customized Pie",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc"
        }
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
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
          name: "days",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: data.sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "#111"
          },
          labelLine: {
            lineStyle: {
              color: "#111"
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelayUpdate: () => Math.random() * 200
        }
      ]
    };
  }

  getBarOption(data) {
    return {
      legend: {
        data: ["bar", "bar2"],
        align: "left"
      },
      tooltip: {},
      xAxis: {
        data: data.measure || [],
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [
        {
          name: "Category",
          type: "bar",
          data: data.dimension || [],
          animationDelay: idx => idx * 10
        }
        // {
        //   name: 'bar2',
        //   type: 'bar',
        //   data: data2,
        //   animationDelay: (idx) => idx * 10 + 100,
        // },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: idx => idx * 5
    };
  }

  getLineOptions(data) {
    return {
      xAxis: {
        type: "category",
        data: data.measure || []
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: data.dimension || [],
          type: "line"
        }
      ]
    };
  }

  getDoughnutCOptions(data) {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: data.measure
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: data.formatted
        }
      ]
    };
  }

  getScatterOptions(data) {
    return {
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: data,
          type: "scatter"
        }
      ]
    };
  }

}
