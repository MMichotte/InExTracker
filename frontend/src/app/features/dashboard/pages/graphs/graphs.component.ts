import { Component, OnInit } from '@angular/core';
import { Transaction } from '@features/transactions/models/transaction.model';
import { TransactionService } from '@features/transactions/services/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(
    private readonly transactionService: TransactionService,
  ) { }

  title = 'Year Distribution of ';
  type = 'ComboChart';
  columnNames = ['','Income','Expense','Net', 'Cumulative'];
  options = {
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Amount (€)'
    },
    seriesType: 'bars',
    colors: ['#348ceb', '#eb3434', '#24ad11', '#eb34b7'],
    series: { 3: { type: 'line' } }
  };
  width = 1000;
  height = 400;
  data = [];


  year: string = (new Date).getFullYear().toString();
  months: string[] = moment.monthsShort();
  
  ngOnInit(): void {
    this.data = this.months.map((m: any) => {return [m, 0, 0, 0, 0]})
    this._fetchYearData(this.year);
    this.title += this.year;
  }

  private _fetchYearData(year: string) {
    this.transactionService.getDetailByYear(year).subscribe(
      (transactions: any) => {
        transactions.forEach((tr: Transaction) => {
          const month = new Date(tr.executionDate).getMonth();
          const data = this.data[month];
          if (tr.amount >=0) {
            data[1] = +data[1] + tr.amount;
          } else {
            data[2] = +data[2] + tr.amount;
          }
          data[3] = +data[3] + tr.amount;
          try {
            data[4] = this.data[month -1][4] + data[3];
          } catch {
            data[4] = data[3];
          }
        });
        this.data = this.data.map(data => {
          if (data[1] == 0 && data[2] == 0) {
            return [data[0], null, null, null, null];
          }
          return data;
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
