import { Transaction } from './../../../transactions/models/transaction.model';
import { TransactionService } from './../../../transactions/services/transaction.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SimpleBalanceDTO } from '@features/transactions/dto/simple-balance.dto';
import { Router } from '@angular/router';

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

  selectedEntry: any = null;
  showModal: boolean = false;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly router: Router
  ) {
    document.body.addEventListener('click', (e: any) => {
      if(e.target.tagName !== 'LI') {
        this.selectedEntry = null;
      }
    }, true); 
  }

  ngOnInit(): void {
    let month: any = this.date.getMonth() + 1;
    month = (month < 10) ? (`0${month}`) : month;
    this.selectedMonth = `${this.date.getFullYear()}-${month}`;

    this._refreshData();
  }


  public setSelectedEntry(tr: any): void {
    this.selectedEntry = tr
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
  
  private _sortByDate(a: Transaction, b:Transaction) {
    const aa:any = new Date(a.executionDate)
    const bb:any = new Date(b.executionDate)
    return  aa - bb;
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
          tr.amount = tr.amount.toFixed(2);
        });
        this.incomes.sort(this._sortByDate);
        this.expenses.sort(this._sortByDate);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public setDate(value: string): void {
    this.selectedMonth = value;
    this._refreshData();
  }


  public onAdd(): void {
    this.router.navigate(['home/add'])
  }

  public onDelete(): void {
    if (this.selectedEntry.repeat) {
      this.showModal = true;
    } else {
      this.deleteEntry(false);
    }
  }

  public deleteEntry(deleteAll: boolean): void {
    this.transactionService.deleteTransaction(this.selectedEntry,deleteAll).subscribe(
      (res: any) => {
        this.selectedEntry = null;
        this._refreshData();
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.showModal = false;
  }

  private _refreshData(): void {
    this.incomes = [];
    this.expenses = [];
    this._getCurrentMonthBalance();
    this._getGeneralBalance();
    this._getDetailByMonth();
  }

}
