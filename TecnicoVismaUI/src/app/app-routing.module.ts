import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home',component:HomeComponent,
   children:[{
     path:'products',
     component:ProductTableComponent
   },
   {
     path:'customers',
     component:CustomerTableComponent
   }]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
