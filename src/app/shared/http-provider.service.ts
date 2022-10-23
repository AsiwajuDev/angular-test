import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

var apiUrl = 'http://localhost:8100/';

var httpLink = {
  getAllBook: apiUrl + '/api/Book/getAllBook',
  deleteBookById: apiUrl + '/api/Book/deleteBookById',
  getBookDetailById: apiUrl + '/api/Book/getBookDetailById',
  saveBook: apiUrl + '/api/Book/create',
};
@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: ApiService) {}

  public getAllBooks(): Observable<any> {
    return this.webApiService.get(httpLink.getAllBook);
  }
  public deleteBookById(model: any): Observable<any> {
    return this.webApiService.post(
      httpLink.deleteBookById + '?BookId=' + model,
      ''
    );
  }
  public getBookDetailById(model: any): Observable<any> {
    return this.webApiService.get(
      httpLink.getBookDetailById + '?BookId=' + model
    );
  }
  public CreateBook(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveBook, model);
  }
}
