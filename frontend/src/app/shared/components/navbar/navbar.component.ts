import { AuthService } from '@core/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(
    public readonly auth: AuthService,
    public readonly router: Router
    ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
