import { Transaction } from './../../../transactions/models/transaction.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '@features/transactions/services/transaction.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private router: Router,
    private readonly transactionService: TransactionService,
  ) { }

  transactionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    executionDate: new FormControl(this._formatDate(new Date()), Validators.required),
    repeat: new FormControl(''),
    description: new FormControl(''),
  })

  displaySpinner: boolean = false;
  transactionType: string = '';

  ngOnInit(): void {
  }

  public setTransactionType(type: string): void {
    this.transactionType = type;
  }

  onSubmit(): void {
    this.displaySpinner = true;
    let transaction = this.transactionForm.getRawValue();

    if (this.transactionType === 'expense') {
      transaction.amount  = (transaction.amount > 0)? transaction.amount * -1 : transaction.amount;
    } else {
      transaction.amount  = (transaction.amount > 0)? transaction.amount : transaction.amount * -1;
    }

    if (transaction.repeat == '') {
      delete transaction.repeat;
    }
    this.transactionService.createTransaction(transaction).subscribe(
      (res: any) => {
        // console.log(res);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  private _formatDate(date) {
    let newDate = new Date(date);
    return newDate.toJSON().split('T')[0];
  }

}
