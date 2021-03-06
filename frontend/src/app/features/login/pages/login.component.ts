import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private auth: AuthService, private router: Router) { }

    loginForm = new FormGroup({
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
      this.auth.loginUser(this.loginForm.value).subscribe(
        (res: any) => {
          this.auth.setLogin(res.token);
          this.router.navigate(['/']);
        },
        error => {
          if (error.status === 401) {
            this.errorMsg = 'Incorrect email or password';
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
