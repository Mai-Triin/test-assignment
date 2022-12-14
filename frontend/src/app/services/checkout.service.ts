import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PageRequest } from '../models/page';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCheckOuts(filter: Partial<PageRequest>): Observable<Page<Book> | Error> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Book>>(url, {params});
  }

  getCheckOut(checkOutId: string): Observable<Book | Error> {
    const url = this.baseUrl + '/getCheckout';
    const params = new HttpParams().set('checkOutId', checkOutId);
    return this.http.get<Book>(url, {params});
  }

}
