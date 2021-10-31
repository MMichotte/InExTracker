import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  endpoint: string = '/api/transactions';

  constructor(private readonly httpClient: HttpClient) { }

  getCurrentMonthBalance(yearMonth: string): any {
    return this.httpClient.get(`${this.endpoint}/currentmonth-balance/${yearMonth}`);
  }
  getGeneralBalance(yearMonth: string): any {
    return this.httpClient.get(`${this.endpoint}/general-balance/${yearMonth}`);
  }

  getDetailAll(): any {
    return this.httpClient.get(`${this.endpoint}`);
  }

  getDetailByMonth(yearMonth: string): any {
    return this.httpClient.get(`${this.endpoint}/${yearMonth}`);
  }

}
