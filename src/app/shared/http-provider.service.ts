import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

var apiUrl = 'http://localhost:8100/';

var httpLink = {
  getAllBook: apiUrl + '/api/Book/getAllBook',
  deleteBookById: apiUrl + '/api/Book/deleteBookById',
  getBookDetailById: apiUrl + '/api/Book/getBookDetailById',
  createBook: apiUrl + '/api/Book/create',
  updateBook: apiUrl + '/api/Book/update',
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
  public createBook(model: any): Observable<any> {
    return this.webApiService.post(httpLink.createBook, model);
  }
  public updateBook(model: any): Observable<any> {
    return this.webApiService.patch(httpLink.updateBook, model);
  }
}
