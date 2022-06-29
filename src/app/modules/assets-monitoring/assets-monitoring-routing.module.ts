import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsMonitoringComponent } from './assets-monitoring.component';
import { AssetsMonitoringService } from './assets-monitoring.service';

const routes: Routes = [{ path: '**', component: AssetsMonitoringComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AssetsMonitoringService],
})
export class AssetsMonitoringRoutingModule {}
