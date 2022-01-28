import { Transaction } from './../../../transactions/models/transaction.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '@features/transactions/services/transaction.service';
import { TransactionTypes } from '@features/transactions/consts/transactionTypes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private router: Router,
    private readonly transactionService: TransactionService,
    private readonly cd: ChangeDetectorRef
  ) { }


  titleError: string = '';
  amountError: string = '';
  amount: any;
  TransactionTypes = TransactionTypes;

  transactionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
    executionDate: new FormControl(this._formatDate(new Date()), Validators.required),
    repeat: new FormControl(''),
    tags: new FormControl(null),
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
    this.titleError = '';
    this.amountError = '';

    const transaction = this.transactionForm.getRawValue();

    if (!transaction.title || !transaction.amount) {
      if (!transaction.title && !transaction.amount) {
        this.titleError = 'This field is required.'
        this.amountError = 'This field is required.'
      } else if (!transaction.title) {
        this.titleError = 'This field is required.'
      } else {
        this.amountError = 'This field is required.'
      }
      return
    }

    transaction.amount = +(transaction.amount.replace(',', '.'));

    if (this.transactionType === 'expense') {
      transaction.amount = (transaction.amount > 0) ? transaction.amount * -1 : transaction.amount;
    } else {
      transaction.amount = (transaction.amount > 0) ? transaction.amount : transaction.amount * -1;
    }

    if (transaction.repeat == '') {
      delete transaction.repeat;
    }

    if (transaction.tags) {
      transaction.tags = transaction.tags.label;
    }

    this.transactionService.createTransaction(transaction).subscribe(
      (res: any) => {
        // console.log(res);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log(error);
        this.amountError = 'Invalid amount. Ex: 23.56'
      }
    );

  }

  private _formatDate(date) {
    let newDate = new Date(date);
    return newDate.toJSON().split('T')[0];
  }

}
