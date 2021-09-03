import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
