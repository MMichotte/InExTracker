import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor (private auth: AuthService, private router: Router) { }

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  errorMsg: string;
  displayError: boolean = false;
  displaySpinner: boolean = false;

  ngOnInit (): void {
    this.auth.logout();
  }

  onSubmit (): void {
    this.displaySpinner = true;
    this.auth.signUpUser(this.signupForm.value).subscribe(
      (res: any) => {
        this.router.navigate(['/']);
      },
      error => {
        if (error.status === 409) {
          console.log(error);
          this.errorMsg = error.error;
        }
        this.displayError = true;
        this.displaySpinner = false;
        console.log(error);
      }
    );
  }

  hideError (): void {
    this.displayError = false;
  }

}
