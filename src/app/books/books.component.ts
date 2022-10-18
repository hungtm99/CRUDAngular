import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../Services/http-server.service';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  public Books = [];
  constructor(private httpServerService: HttpServerService,private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.httpServerService.getPosts().subscribe(data =>{
      this.Books = data;
      // console.log('book',this.Books);
    });
  }
  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }
}
