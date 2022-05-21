import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { map} from 'rxjs';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { CustomerI } from 'src/app/models/customer.interface';
import { OrderI } from 'src/app/models/order.interface';
import { OrderDetailsSummaryI } from 'src/app/models/orderSummary.interface';
import { ProductI } from 'src/app/models/product.interface';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-customers-operations',
  templateUrl: './customers-operations.component.html',
  styleUrls: ['./customers-operations.component.scss']
})
export class CustomersOperationsComponent implements OnInit, OnDestroy {

  @Input() customerToDisplay:CustomerI = {
    id: 0,
    firstName: '',
    lastName: '',
    birthday: '',
    gender: undefined,
    country: undefined,
    postalCode: '',
    address: '',
    mailAddress: '',
    productDiscount: 0
  };

  displayedColumns: string[] = ['productName', 'productQuantity', 'productUnitPrice','productDiscount','totalNormalPrice','totalDiscount','totalDiscountedPrice']; 
  dataSource = new MatTableDataSource<OrderDetailsSummaryI>();

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
    this.dataSource = new MatTableDataSource();

    this.onValChanges();


  }

  ngOnDestroy(): void{
  }

  ngOnInit(): void {
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

  ////////// REACTIVE METHODS ///////////////////

  onValChanges(): void {
    this.orderForm.controls['customerId'].valueChanges.subscribe((val) => {
      this.orderDetails.controls.forEach(orderDetails => {
        this.getOrderDetailsTotalPrice(orderDetails);
      })
    });
  }

  enableQuantityInput(orderDetails:any){
    if(orderDetails.value.productId && orderDetails.controls.productQuantity.disabled){
      orderDetails.controls.productQuantity.enable()     
    }
  }

  getOrderDetailsTotalPrice(orderDetails:any):void{
    var productQuantity = orderDetails.get('productQuantity').value;
    var customerId = this.orderForm.get("customerId")?.value;

    if(productQuantity != null){
      var productId = orderDetails.get('productId').value;
      var productUnitPrice:number = 0;
      var productDiscount:number = 0;

      this.customers.forEach(x => {
        if(x.id == customerId){
          productDiscount = x.productDiscount
        }
      });

      this.products.forEach(x => {
        if(x.id == productId){
          productUnitPrice = x.unitPrice
        }
      });
      var totalPrice = productQuantity * (productUnitPrice - ((productUnitPrice * productDiscount)/100));   
      orderDetails.get('price').setValue(totalPrice);   
    }     
  }
  
  setCustomerToDisplay(customerId:number):void{
    this.customers.forEach(x =>{
      if(x.id == customerId){
        this.customerToDisplay = x;
      }
    });
  }
  
  ///////////// AVM ORDER DETAILS /////////////

  addOrderDetails():void {
    if(this.orderForm.value.customerId){
      const orderDetailsForm = this._formBuilder.group({
        productId: ['', Validators.required],
        productQuantity: [{value: 0, disabled:true}, Validators.required],
        price : ['', Validators.required]
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
  get orderDetails() {
    return this.orderForm.controls["orderDetails"] as FormArray;
  }



  //////////// STEPPER - SUBMIT FORM - API CALLS VALIDATIONS ////////////////
  
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
      this.api.getOrderSummary(this.order).subscribe((data:ApiResponseI) => {
        if(data.isError){
          this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
        }
        else{
          this.order.totalOrder = data.data.totalOrder;
          this.order.orderDetails = data.data.orderDetails;
          this.dataSource.data = data.data.orderDetailsSummary;
          this.order.orderDetails = data.data.orderDetailsSummary.map((x:OrderDetailsSummaryI) => (
            {
              id: 0,
              orderId:0,
              productId:x.productId,
              productQuantity:x.productQuantity,
              price:x.totalDiscountedPrice
            }));
          stepper.next();     
        }
      })
    }
  }
}


