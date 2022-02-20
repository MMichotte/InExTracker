import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TransactionService } from '@features/transactions/services/transaction.service';
import { TransactionExpenseTags } from '@features/transactions/constants/transactionExpenseTags';
import { TransactionRevenueTags } from '@features/transactions/constants/transactionRevenueTags';
import { Transaction } from '@features/transactions/models/transaction.model';
import { repeat } from 'rxjs/operators';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly transactionService: TransactionService,
    private readonly cd: ChangeDetectorRef
  ) { }

  
  titleError: string = '';
  amountError: string = '';
  amount: any;
  TransactionExpenseTags = TransactionExpenseTags;
  TransactionRevenueTags = TransactionRevenueTags;
  currentTransaction: Transaction = null;

  transactionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
    executionDate: new FormControl(moment().format('YYYY-MM-DD'), Validators.required),
    repeat: new FormControl(''),
    endDate: new FormControl(moment().format('YYYY-MM-DD')),
    tags: new FormControl(null),
    description: new FormControl(''),
  })

  displaySpinner: boolean = false;
  transactionType: string = '';

  async ngOnInit(): Promise<void> {
    const transactionId = this.route.snapshot.params.id;
    if (transactionId) {
      try {
        this.currentTransaction = (await this.transactionService.getDetailOne(transactionId).toPromise())[0];
        this.transactionForm.patchValue({
          title: this.currentTransaction.title,
          amount: Math.abs(+this.currentTransaction.amount).toString(),
          executionDate: moment(this.currentTransaction.executionDate).format('YYYY-MM-DD'),
          repeat: this.currentTransaction.repeat ? this.currentTransaction.repeat : '',
          endDate: moment(this.currentTransaction.endDate).format('YYYY-MM-DD'),
          tags: this._findTag(this.currentTransaction.tags),
          description: this.currentTransaction.description,
        });
        if (this.currentTransaction.repeat) {
          this.transactionForm.controls.executionDate.disable();  
        }
        this.transactionForm.controls.repeat.disable();
        this.transactionForm.controls.endDate.disable();

      } catch (e) {
        console.log(e);
        this.router.navigate(['/home']);
      }
    }
  }

  private _findTag(tag: any) {
    let foundTag = null;
    foundTag = this.TransactionExpenseTags.find(t => { return t.label == tag.label});
    if (!foundTag) {
      foundTag = this.TransactionRevenueTags.find(t => { return t.label == tag.label});
    }
    return foundTag;
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

    if (this.transactionType === 'expense' || this.currentTransaction?.amount < 0 ) {
      transaction.amount = (transaction.amount > 0) ? transaction.amount * -1 : transaction.amount;
    } else {
      transaction.amount = (transaction.amount > 0) ? transaction.amount : transaction.amount * -1;
    }

    if (transaction.repeat == '') {
      delete transaction.repeat;
    }

    if (transaction.tags) {
      transaction.tags = transaction.tags;
    }

    if (this.currentTransaction) {
      this._submitUpdate(transaction);
    } else {
      this._submitCreate(transaction);
    }

  }

  private _submitCreate(transaction): void {
  
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
  
  private _submitUpdate(transaction): void {
    this.transactionService.updateTransaction(this.currentTransaction._id, transaction).subscribe(
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

}
