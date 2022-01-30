import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { YearDistributionGraphComponent } from './components/year-distribution-graph/year-distribution-graph.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { TagDistributionGraphComponent } from './components/tag-distribution-graph/tag-distribution-graph.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [YearDistributionGraphComponent, TagDistributionGraphComponent, DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GoogleChartsModule,
  ]
})
export class DashboardModule { }
