import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  endpoint: string = '/api/transactions';

  constructor(private readonly httpClient: HttpClient) { }

  getCurrentMonthBalance(yearMonth: string): any {
    return this.httpClient.get(`${this.endpoint}/month-balance/${yearMonth}`);
  }
  getGeneralBalance(yearMonth: string): any {
    return this.httpClient.get(`${this.endpoint}/general-balance/${yearMonth}`);
  }

  getDetailAll(): any {
    return this.httpClient.get(`${this.endpoint}`);
  }
  
  getDetailOne(id: string): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  getDetailByYear(year: string): any {
    return this.httpClient.get(`${this.endpoint}/year/${year}`);
  }

  getDetailByMonth(yearMonth: string): any {
    return this.httpClient.get(`${this.endpoint}/yearMonth/${yearMonth}`);
  }

  createTransaction(transaction: any): any {
    return this.httpClient.post(`${this.endpoint}`, transaction);
  }
  
  updateTransaction(id:string, transaction: any): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, transaction);
  }
  
  deleteTransaction(transaction: any, deleteAll: boolean): any {
    return this.httpClient.request('delete', `${this.endpoint}`, {body: {transaction: transaction, deleteAll: deleteAll}});
  }

}
