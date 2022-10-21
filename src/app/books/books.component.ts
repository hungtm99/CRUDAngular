import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../Services/http-server.service';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})

export class BooksComponent implements OnInit {
  closeResult = '';
  public Books = [];

  public formData = this.formBuilder.group({
    title: ['', Validators.required],
    author:['', Validators.required],
    price:['', Validators.required]
  });
  public BookEdit = {
    title : '',
    author : '',
    price: ''
  };
  constructor(
    private common: CommonService,
    private router: Router,
    private httpServerService: HttpServerService,
    private modalService: NgbModal, 
    private formBuilder:FormBuilder,
    // private popupBook: PopupBookComponent
    
  ) {}

  open(content:any, id:any) {
    if(id !== ''){
      this.loadDataToModal(id);
    }else{
      this.formData.get('title')?.setValue('');
      this.formData.get('author')?.setValue('');
      this.formData.get('price')?.setValue('');
    }

		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        if(id == 0){
          this.addData();
        }else{
          this.editData(id);
        }
			},
			(reason) => {
				this.closeResult = `Hủy`;
        this.resetData();
			},
		);
	}
  public resetData(){
    this.BookEdit.title = '';
    this.BookEdit.author = '';
    this.BookEdit.price = '';
  }
  // private getDismissReason(reason: any): string {
	// 	if (reason === ModalDismissReasons.ESC) {
	// 		return 'by pressing ESC';
	// 	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
	// 		return 'by clicking on a backdrop';
	// 	} else {
	// 		return `with: ${reason}`;
	// 	}
	// }

  ngOnInit(): void {
    if(this.common.getTaiKhoan() == ""){
      this.router.navigate(['/login']);
    }else{
      this.getBooks();
    }
    // this.getBooks();
  }

  public deletePost(postId:any){
    if(confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      this.httpServerService.deletePost(postId).subscribe();
      this.closeResult ='Xóa thông tin thành công'
      this.getBooks();
      this.resetData();
    }
  }

  public getBooks(){
    this.httpServerService.getPosts().subscribe(data =>{
      this.Books = data;
    });
  }

  public loadDataToModal(id:any){
    this.httpServerService.getPost(id).subscribe((data)=>{
      this.BookEdit.title  = data['title'];
      this.BookEdit.author  = data['author'];
      this.BookEdit.price  = data['price'];

      console.log("edittttttt",this.BookEdit);
      this.formData.get('title')?.setValue(this.BookEdit.title);
      this.formData.get('author')?.setValue(this.BookEdit.author);
      this.formData.get('price')?.setValue(this.BookEdit.price);
    });
  }
  public addData():void{
    const payload= { 
      title: this.formData.value['title'],
      author: this.formData.value['author'],
      price: this.formData.value['price']
    };
    this.httpServerService.addPost(payload).subscribe((data)=>{
      this.getBooks();
      this.closeResult ='Thêm thông tin thành công'
    });
    this.resetData();
  }

  public editData(id:any):void{
    
    const payload= { 
      title: this.formData.value['title'],
      author: this.formData.value['author'],
      price: this.formData.value['price']
    };
    this.httpServerService.editPost(id,payload).subscribe((data)=>{
      console.log(data);
      this.getBooks();
      this.closeResult ='Chỉnh sửa thông tin thành công'
    });
    this.resetData();
  }
}