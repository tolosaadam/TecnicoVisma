import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './components/shared-components/footer/footer.module';
import { HeaderModule } from './components/shared-components/header/header.module';
import { HomeModule } from './views/home/home.module';
import { LoginModule } from './views/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { RegistryModule } from './views/registry/registry.module';
import {AppHttpInterceptor} from './utils/HttpInterceptor';
import { SharedComponentsModule } from './components/shared-components/shared-components.module';
import { SettingsHttpService } from './services/settings/settings-http.service';


export function app_Init(settingsHttpService: SettingsHttpService){
  return () => settingsHttpService.initializeApp();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FooterModule,
    HeaderModule,
    LoginModule,
    HomeModule,
    RegistryModule,
    HttpClientModule,
    NgToastModule,
    SharedComponentsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: app_Init,
    deps: [SettingsHttpService],
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
