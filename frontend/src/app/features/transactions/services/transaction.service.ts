import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  endpoint: string = '/api/transactions';

  constructor(private readonly httpClient: HttpClient) { }

  getCurrentMonthBalance(): any {
    return this.httpClient.get(`${this.endpoint}/currentmonth-balance`);
  }
  getGeneralBalance(): any {
    return this.httpClient.get(`${this.endpoint}/general-balance`);
  }

  getDetailAll(): any {
    return this.httpClient.get(`${this.endpoint}`);
  }
  getDetailByMonth(monthNumber: number): any {}

}
