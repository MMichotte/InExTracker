import { Component, OnInit } from '@angular/core';
import { Transaction } from '@features/transactions/models/transaction.model';
import { TransactionService } from '@features/transactions/services/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tag-distribution-graph',
  templateUrl: './tag-distribution-graph.component.html',
  styleUrls: ['./tag-distribution-graph.component.scss']
})
export class TagDistributionGraphComponent implements OnInit {

  constructor(
    private readonly transactionService: TransactionService
  ) { }

  title_inc = 'Income Distribution of ';
  title_exp = 'Expense Distribution of ';
  type = 'PieChart';

  data_inc = [];
  data_exp = [];

  year: number = moment().year();
  month: number = moment().month() + 1;
  
  ngOnInit(): void {
    const year: string = this.year.toString();
    const month: any = (this.month < 10) ? (`0${this.month}`) : this.month;
    const thisMonth = `${year}-${month}`;

    this._fetchYearData(thisMonth);
    const monthOfYear: string = `${moment().format('MMMM')} ${year}`;
    this.title_inc += monthOfYear;
    this.title_exp += monthOfYear;
  }

  private _fetchYearData(yearMonth: string) {
    this.transactionService.getDetailByMonth(yearMonth).subscribe(
      (transactions: any) => {

        transactions.forEach((tr: Transaction) => {
          tr.tags = tr.tags ? `${tr.tags.icon}  ${tr.tags.label}` : '🗃 Other';
          let dt: any = [];
          if (tr.amount >= 0) {
            dt = this.data_inc;
          } else {
            dt = this.data_exp;
          }
          const tag: any = dt.find(d => {return d[0] === tr.tags});
          if (tag) {
            tag[1] += Math.abs(+tr.amount);
          } else {
            dt.push([tr.tags, Math.abs(+tr.amount)]);
          }
        });
        this.data_inc = Object.assign([], this.data_inc);
        this.data_exp = Object.assign([], this.data_exp);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
