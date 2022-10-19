import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../Services/common.service';
import { HttpServerService } from '../Services/http-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formData = this.formBuilder.group({
    taikhoan: ['', Validators.required],
    matkhau:['', Validators.required]
  });

  public Users = [];
  constructor(
    private common: CommonService, 
    private formBuilder:FormBuilder, 
    private httpServerService: HttpServerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.common.getTaiKhoan() != ""){
      this.router.navigate(['/index']);
    }
  }
  public onSubmit():void{
    this.httpServerService.getListUser().subscribe((data:any) =>{
        
      this.Users = data['account'];
        for (let i = 0; i < this.Users.length ; i++) {
          if(this.Users[i]['name'] == this.formData.value['taikhoan'] 
              && this.Users[i]['password'] == this.formData.value['matkhau']){
                
                this.common.setTaiKhoan(this.Users[i]['name']);
                this.router.navigate(['/index'])
          }
        }
    });
  }
}
