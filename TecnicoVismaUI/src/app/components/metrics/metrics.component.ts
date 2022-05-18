import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics/metrics.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  bigChart: any[] = [];
  cards: any[] = [];
  pieChart: any[] = [];

  constructor(private metricsService: MetricsService) { }

  ngOnInit(): void {
    this.bigChart = this.metricsService.bigChart();
    this.cards = this.metricsService.cards();
    this.pieChart = this.metricsService.pieChart();
  }

}
