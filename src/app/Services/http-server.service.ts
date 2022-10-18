import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  }
  constructor(private httpClient: HttpClient) { }
  public getPosts():Observable<any>{
    const url = `${this.REST_API_SERVER}/posts`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
