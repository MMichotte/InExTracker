import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { YearDistributionGraphComponent } from './components/yearDistribution/yearDistribution.graph.component';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [YearDistributionGraphComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GoogleChartsModule,
  ]
})
export class DashboardModule { }
