import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { LoadingService } from '../spinner/loading.service';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss']
})
export class ThemeMenuComponent implements OnInit {

  @Input() options: any;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private loadingService:LoadingService, private themeService: ThemeService) { }

  ngOnInit(): void {
    
    
  }

  async changeTheme(themeToSet: any) {
    
    this.loadingService.show();
    await this.timeout(1000).then(()=>{
      localStorage.setItem('userTheme', themeToSet);
      this.themeChange.emit(themeToSet);
    });
    
    
  }

  async timeout(ms:number) {
    setTimeout(async () => {
      this.loadingService.hide();
    }, ms);
  }

}
