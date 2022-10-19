import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private taikhoan = '';
  constructor() { }

  public setTaiKhoan(taikhoan:string){
    this.taikhoan = taikhoan;
  }

  public getTaiKhoan():string{
    return this.taikhoan;
  }
}
