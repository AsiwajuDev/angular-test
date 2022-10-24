import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

var httpLink = {
  getAllBook: environment.apiUrl + '/api/Books/all',
  deleteBookById: environment.apiUrl + '/api/Books/',
  createBook: environment.apiUrl + '/api/Books/create',
  updateBook: environment.apiUrl + '/api/Books/update',
};
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private webApiService: ApiService) {}

  public getAllBooks(): Observable<any> {
    return this.webApiService.get(httpLink.getAllBook);
  }
  public deleteBookById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteBookById + model);
  }

  public createBook(model: any): Observable<any> {
    return this.webApiService.post(httpLink.createBook, model);
  }
  public updateBook(model: any): Observable<any> {
    return this.webApiService.patch(httpLink.updateBook, model);
  }
}
