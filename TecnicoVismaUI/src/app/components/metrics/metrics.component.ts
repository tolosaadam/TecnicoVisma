import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PieChartI } from 'src/app/models/pieChart-interface';
import { MetricsService } from 'src/app/services/metrics/metrics.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { LoadingService } from '../shared-components/spinner/loading.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  bigChart: any[] = [];


  

  @Input() productByCategoryChart:PieChartI[] = [];

  @Input() productChart:any = {
    dataValues: [] = [],
    productsTotal: 0,
    item : "New Product"
  }
  @Input() customerChart:any = {
    dataValues: [] = [],
    customersTotal: 0,
    item : "New Customer"
  }
  @Input() userChartSignUp:any = {
    dataValues: [] = [],
    usersTotal: 0,
    item : "New Sign Up"
  }
  @Input() userChartSignIn:any = {
    dataValues: [] = [],
    usersTotal: 0,
    item : "New Sign In"
  }
  chartDataLoading: boolean = true;

  constructor(private _date: DatePipe,private metricsService: MetricsService, private mixpanelService: MixpanelService,private loadingService:LoadingService) {
    this.chartDataLoading = true;
    
   }

   async ngOnInit(): Promise<void> {
    this.bigChart = this.metricsService.bigChart();
    
    await this._createChartsData();
  }

  private async _createChartsData(){   
    await this.mixpanelService.getAllEventsData().then(async (response:any) => {
      this.loadingService.show(); 
      await this._createSignUpChartData(response);
      await this._createSignInChartData(response);
      await this._createCustomerChartData(response);
      await this._createProductChartData(response);
    });
    await this.mixpanelService.getAllProcutsCategoryData().then(async (response:any) =>{
      await this._createProductsByCategoryChartData(response);
      console.log(response)
    });

    this.chartDataLoading = false;
    this.loadingService.hide();
  }


  private async _createProductsByCategoryChartData(data:any){
    const obj = data.series['AddProduct - Total'];
    const arr = Object.entries(obj);
    var totalProducts:number = 0;
      arr.forEach((x:any) => {
        if(x[0] == '$overall'){
          totalProducts = x[1].all;
        }              
      });  
      arr.forEach((x:any) => {
        var pieChartItem:any = {
          name: x[0],
          y: (x[1].all * 100) / totalProducts
        }
        if('$overall' != pieChartItem.name){
          this.productByCategoryChart.push(pieChartItem); 
        }
      })
    console.log(this.productByCategoryChart);

  }

  private async _createSignUpChartData(data:any){

      const obj = data.series['A. Sign up - Total'];
      const arr = Object.entries(obj);
      arr.forEach((x:any) => {
        x[0] = this._date.transform(x[0], 'MM.dd.yyyy');
        this.userChartSignUp.dataValues.push(x);
        this.userChartSignUp.usersTotal += x[1];    
      });  
   }

   private async _createSignInChartData(data:any){
      const obj = data.series['B. Sign in - Total'];
      const arr = Object.entries(obj);
      arr.forEach((x:any) => {
        x[0] = this._date.transform(x[0], 'MM.dd.yyyy');
        this.userChartSignIn.dataValues.push(x);
        this.userChartSignIn.usersTotal += x[1];    
      });  
   }

   private async _createCustomerChartData(data:any){
    const obj = data.series['C. AddCustomer - Total'];
    const arr = Object.entries(obj);
    arr.forEach((x:any) => {
      x[0] = this._date.transform(x[0], 'MM.dd.yyyy');
      this.customerChart.dataValues.push(x);
      this.customerChart.customersTotal += x[1];    
    });  
  }

  private async _createProductChartData(data:any){
    const obj = data.series['D. AddProduct - Total'];
    const arr = Object.entries(obj);
    arr.forEach((x:any) => {
      x[0] = this._date.transform(x[0], 'MM.dd.yyyy');
      this.productChart.dataValues.push(x);
      this.productChart.productsTotal += x[1];    
    });  
  }
}
