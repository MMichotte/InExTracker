import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '@features/transactions/models/transaction.model';
import { TransactionService } from '@features/transactions/services/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tag-distribution-graph',
  templateUrl: './tag-distribution-graph.component.html',
  styleUrls: ['./tag-distribution-graph.component.scss']
})
export class TagDistributionGraphComponent implements OnInit {

  @Input() viewType: string;
  
  constructor(
    private readonly transactionService: TransactionService
  ) { }


  
  title_inc_base = 'Income Distribution of ';
  title_exp_base = 'Expense Distribution of ';
  title_inc = '';
  title_exp = '';
  type = 'PieChart';

  data_inc = [];
  data_exp = [];

  selectedMonth: string = "";

  year: number = moment().year();
  month: number = moment().month() + 1;
  
  ngOnInit(): void {
    const thisYear: string = this.year.toString();
    const thisMonth: any = (this.month < 10) ? (`0${this.month}`) : this.month;
    const thisYearMonth = `${thisYear}-${thisMonth}`;
    this.selectedMonth = thisYearMonth;

    if (this.viewType === 'year') {
      this._fetchYearData(thisYear);
      this.title_inc = `${this.title_inc_base} ${thisYear}`;
      this.title_exp = `${this.title_exp_base} ${thisYear}`;
    } else {
      this._fetchMonthData(thisYearMonth);
      const monthOfYear: string = `${moment(thisYearMonth).format('MMMM')} ${thisYear}`;
      this.title_inc = `${this.title_inc_base} ${monthOfYear}`;
      this.title_exp = `${this.title_exp_base} ${monthOfYear}`;
    }

  }

  public setDate(value: string): void {
    this.selectedMonth = value;
    this.data_exp = [];
    this.data_inc = [];
    const monthOfYear: string = `${moment(this.selectedMonth).format('MMMM')} ${this.selectedMonth.split('-')[0]}`;
    this.title_inc = `${this.title_inc_base} ${monthOfYear}`;
    this.title_exp = `${this.title_exp_base} ${monthOfYear}`;
    this._fetchMonthData(this.selectedMonth);
  }

  private _fetchYearData(year: string) {
    this.transactionService.getDetailByYear(year).subscribe(
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

  private _fetchMonthData(yearMonth: string) {
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
