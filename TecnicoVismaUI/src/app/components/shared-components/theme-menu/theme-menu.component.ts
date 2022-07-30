import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeOptionI } from 'src/app/models/themeOption';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss']
})
export class ThemeMenuComponent implements OnInit {

  @Input() options: any;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  changeTheme(themeToSet: any) {
    this.themeChange.emit(themeToSet);
  }

}
