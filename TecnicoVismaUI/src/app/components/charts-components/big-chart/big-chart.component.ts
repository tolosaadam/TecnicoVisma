import { Component, Input, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-big-chart',
  templateUrl: './big-chart.component.html',
  styleUrls: ['./big-chart.component.scss']
})
export class BigChartComponent implements OnInit {

  chartOptions: HighCharts.Options = {};
  HighCharts: typeof HighCharts = HighCharts;

  @Input() data:any = []

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'area'
      },
      title: {
          text: 'All Events DATA'
      },
      tooltip: {
          split: true,
          valueSuffix: ' events'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled:true,
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
      series: this.data
  };

  HC_exporting(HighCharts);

  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
  }

}
