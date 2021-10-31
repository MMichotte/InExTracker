import { TransactionService } from './../../../transactions/services/transaction.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SimpleBalanceDTO } from '@features/transactions/dto/simple-balance.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  
  date = new Date();
  selectedMonth: string = "";
  currentBalance: number = 0;
  cumulativeBalance: number = 0;
  expenses: any =  [];
  incomes: any = [];

  constructor(
    private readonly transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    let month: any = this.date.getMonth() + 1;
    month = (month < 10) ? (`0${month}`) : month;
    this.selectedMonth = `${this.date.getFullYear()}-${month}`;

    this._getCurrentMonthBalance();
    this._getGeneralBalance();
    this._getDetailByMonth();
  }

  private _getCurrentMonthBalance(): void {
    this.transactionService.getCurrentMonthBalance(this.selectedMonth).subscribe(
      (curBal: SimpleBalanceDTO) => {
        this.currentBalance = +(curBal.balance).toFixed(2);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  private _getGeneralBalance(): void {
    this.transactionService.getGeneralBalance(this.selectedMonth).subscribe(
      (genBal: SimpleBalanceDTO) => {
        this.cumulativeBalance = +(genBal.balance).toFixed(2);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  private _getDetailByMonth(): void {
    this.transactionService.getDetailByMonth(this.selectedMonth).subscribe(
      (transactions: any) => {
        transactions.forEach(tr => {
          if (tr.amount > 0) {
            this.incomes.push(tr);
          } else {
            this.expenses.push(tr);
          }
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public setDate(value: string): void {
    this.selectedMonth = value;
    this.incomes = [];
    this.expenses = [];
    this._getCurrentMonthBalance();
    this._getGeneralBalance();
    this._getDetailByMonth();
  }


}
