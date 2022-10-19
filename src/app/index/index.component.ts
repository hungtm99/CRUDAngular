import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public taiKhoan = "";
  constructor(
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.common.getTaiKhoan() == ""){
      this.router.navigate(['/login']);
    }else{
      this.taiKhoan = this.common.getTaiKhoan();
    }
  }

}
