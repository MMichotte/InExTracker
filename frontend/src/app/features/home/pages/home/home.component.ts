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
  
  calendarMonth = new Date();
  currentMonth = (new Date()).toLocaleString("default", { month: "long" });
  currentBalance: number = 0;
  cumulativeBalance: number = 0;
  expenses: any =  [];
  incomes: any = [];

  constructor(
    private readonly transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this._getCurrentMonthBalance();
    this._getGeneralBalance();
    this._getDetailAll()
  }

  private _getCurrentMonthBalance(): void {
    this.transactionService.getCurrentMonthBalance().subscribe(
      (curBal: SimpleBalanceDTO) => {
        this.currentBalance = curBal.balance;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  private _getGeneralBalance(): void {
    this.transactionService.getGeneralBalance().subscribe(
      (genBal: SimpleBalanceDTO) => {
        this.cumulativeBalance = genBal.balance;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  private _getDetailAll(): void {
    this.transactionService.getDetailAll().subscribe(
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



}
