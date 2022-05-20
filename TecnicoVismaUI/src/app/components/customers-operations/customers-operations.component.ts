import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { CustomerI } from 'src/app/models/customer.interface';
import { OrderI } from 'src/app/models/order.interface';
import { OrderDetailsI } from 'src/app/models/orderDetails.interface';
import { ProductI } from 'src/app/models/product.interface';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-customers-operations',
  templateUrl: './customers-operations.component.html',
  styleUrls: ['./customers-operations.component.scss']
})
export class CustomersOperationsComponent implements OnInit {

  @Input() productDiscount:number = 0;

  displayedColumns: string[] = ['productName', 'productQuantity', 'unitPrice','productDiscount','normalPrice','totalDiscount','price']; 
  dataSource = new MatTableDataSource<OrderDetailsI>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  userId:any = sessionStorage.getItem('userId');
  
  stepperOrientation:any;
  customers:CustomerI[] = [];
  products:ProductI[] = [];

  orderForm = this._formBuilder.group({
    customerId: ['', Validators.required],
    orderDetails: this._formBuilder.array([
    ])
  });

  order:OrderI = {
    id: 0,
    userId: this.userId,
    customerId: 0,
    dateOfOrder: undefined,
    totalOrder: 0,
    orderDetails:[]
  }

  @ViewChild('customerIdSelect')
  customerIdSelect!: MatSelect;



  constructor(private api:ApiService,breakpointObserver: BreakpointObserver,private _formBuilder: FormBuilder, private toast:NgToastService) { 
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 920px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    this.dataSource = new MatTableDataSource(this.order.orderDetails);

  }

  ngOnInit(): void {
    this.dataSource.data = this.order.orderDetails;
    this.dataSource.paginator = this.paginator;
    this.api.getCustomers().subscribe((data:ApiResponseI) => {
      if(data.isError){

      }
      else{
        this.customers = data.data;
      }
    });
    this.api.getProducts().subscribe((data:ApiResponseI) => {
      if(data.isError){
        
      }
      else{
        this.products = data.data;
      }
    })
  }



  get orderDetails() {
    return this.orderForm.controls["orderDetails"] as FormArray;
  }


  addOrderDetails():void {
    if(this.orderForm.value.customerId){
      const orderDetailsForm = this._formBuilder.group({
          productId: ['', Validators.required],
          productQuantity: ['', Validators.required],
      }); 
      this.orderDetails.push(orderDetailsForm);
    }
    else{
      this.toast.info({detail:"Info Message",summary:"You must first select a client."});
    }
  
  }

  deleteOrderDetails(orderDetailsIndex: number) {
    
    this.orderDetails.removeAt(orderDetailsIndex);
  }

  clearOrderDetails():void{
    this.customerIdSelect.options.forEach((data: MatOption) => data.deselect());
    this.orderDetails.clear();
  }

  
  onSubmit(){

    this.api.addOrder(this.order).subscribe((data:ApiResponseI) => {
      if(data.isError){
        this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
      }
      else{
        this.clearOrderDetails();
        this.toast.success({detail:"Success Message",summary:"Order added Sucessfully."});
      }
    })

  }

  
  setCustomerDiscount(customerId:number):void{
    this.customers.forEach(x =>{
      if(x.id == customerId){
        this.productDiscount = x.productDiscount
      }
    });
  }

  goBack(stepper: MatStepper){
      stepper.previous();
  }

  goForward(form:any,stepper: MatStepper){
    if(!this.customerIdSelect.value){
      this.toast.info({detail:"Info Message",summary:"Please select a customer."});
    }
    else if(this.orderDetails.length < 1){
      this.toast.info({detail:"Info Message",summary:"You must first add a product."});
    }
    else if(!this.orderDetails.valid){
      this.toast.info({detail:"Info Message",summary:"Please complete all the fields."});
    }
    else
    {
      this.order.customerId = form.customerId;
      this.order.orderDetails = form.orderDetails;
      this.api.getOrderPrices(this.order).subscribe((data:ApiResponseI) => {
        if(data.isError){
          this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
        }
        else{
          this.order.totalOrder = data.data.totalOrder;
          this.order.orderDetails = data.data.orderDetails;
          this.dataSource.data = this.order.orderDetails;
          stepper.next();     
        }

      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}


