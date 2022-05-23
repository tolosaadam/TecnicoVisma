import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiResponseI } from 'src/app/models/comunication-models/apiResponse.interface';
import { UserI } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() userId:any = 0;
  @Input() userDTO:UserI = {
    id: 0,
    firstName: '',
    lastName: '',
    birthday: '',
    gender: undefined,
    country: undefined,
    postalCode: '',
    address: '',
    mailAddress: '',
    password: '',
    filePath: ''
  }
  @Input() profileIMG:any;
  imageLoading:boolean = true;


  constructor(private api:ApiService) {
    this.imageLoading = true;
   }

  async ngOnInit(): Promise<void> {

    this.userId = sessionStorage.getItem('userId');
    

    this.api.getUser(this.userId).subscribe(async (response:ApiResponseI) => {
      if(!response.isError){
        this.userDTO = response.data;
        if(this.userDTO.filePath == '' || this.userDTO.filePath == null){
          this.profileIMG = 'assets/images/random-avatar.png';
        }
        else{
          await this.createImgPath(this.userDTO.filePath);
        }
      }
    });  
    this.imageLoading = false; 
  }

  createImgPath =  async (serverPath:string) => {
    this.api.getDocument(serverPath).subscribe((response: ApiResponseI) => {
      if(!response.isError){
        this.profileIMG = response.data;
      }
      else{
        this.profileIMG = 'assets/images/random-avatar.png';
      }
    });
  }
}
