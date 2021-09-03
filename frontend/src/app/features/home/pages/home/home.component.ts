import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentMonth = (new Date()).toLocaleString("default", { month: "long" })
  currentBalance: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
