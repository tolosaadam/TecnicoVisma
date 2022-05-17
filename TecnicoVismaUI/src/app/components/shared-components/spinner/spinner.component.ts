import { Component, Inject, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading$ = this.loadingService.loading$;


  constructor(@Inject(LoadingService) public loadingService:LoadingService) { }

  ngOnInit(): void {
  }

}
