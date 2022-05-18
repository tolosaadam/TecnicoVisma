import { Component, Input, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-card-chart',
  templateUrl: './card-chart.component.html',
  styleUrls: ['./card-chart.component.scss']
})
export class CardChartComponent implements OnInit {

  @Input() label!:string;
  @Input() total!:string;
  @Input() percentage!:string;
  
  HighCharts: typeof HighCharts = HighCharts;
  chartOptions: HighCharts.Options = {};

  @Input() data:any = []

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'area',
          backgroundColor: undefined,
          borderWidth: 0,
          margin: [2, 2, 2, 2],
          height: 60
      },
      title: {
          text: undefined
      },
      subtitle: {
          text: undefined
      },
      tooltip: {
          split: true,
          outside: true
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled:false,
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        title: {
          text: undefined
        },
        startOnTick: false,
        endOnTick: false
      },
      plotOptions: {
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
          }
      },
      series: [{
          name: "xd",
          type: 'area',
          data: this.data
      }]
  };

  HC_exporting(HighCharts);

  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
  }

}
