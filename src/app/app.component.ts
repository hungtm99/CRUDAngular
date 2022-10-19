import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../app/Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quản lý sách';
  
  constructor(
    private common: CommonService, 
    private router: Router
  ) {}
  public logOut(){
    if(confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      this.common.setTaiKhoan("");
      this.router.navigate(['/login']);
    }
  }
}