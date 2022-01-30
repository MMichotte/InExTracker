import { Component, OnInit } from '@angular/core';
import { Transaction } from '@features/transactions/models/transaction.model';
import { TransactionService } from '@features/transactions/services/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-yearDistribution.graph',
  templateUrl: './yearDistribution.graph.component.html',
  styleUrls: ['./yearDistribution.graph.component.scss']
})
export class YearDistributionGraphComponent implements OnInit {

  constructor(
    private readonly transactionService: TransactionService
  ) { }

  title = 'Year Distribution of ';
  type = 'ComboChart';
  columnNames = ['','Income', 'Expense', 'Net', 'Cumulative'];
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
        });
        this.data.forEach((d, idx) => {
          if (d[1] == 0 && d[2] == 0) {
            d[1] = null;
            d[2] = null;
            d[3] = null;
            d[4] = null;
          } else {
            if (idx > 0) {
              d[4] = this.data[idx - 1][4] + d[3];
            } else {
              d[4] = d[3]
            }
          }
        });
        this.data = Object.assign([], this.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
