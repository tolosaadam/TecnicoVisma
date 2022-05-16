import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegistryComponent } from './views/registry/registry.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'registry', component:RegistryComponent},
  {path:'home',component:HomeComponent,
   children:[{
     path:'',
     redirectTo:'metrics',
     pathMatch:'full'
   },
   {
     path:'products',
     component:ProductTableComponent
   },
   {
     path:'customers',
     component:CustomerTableComponent
   },
   {
     path:'metrics',
     component: MetricsComponent
   }]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
