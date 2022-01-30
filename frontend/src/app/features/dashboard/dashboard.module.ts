import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [GraphsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GoogleChartsModule,
  ]
})
export class DashboardModule { }
