import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeSearchComponent } from './trade-search.component';

const routes: Routes = [{ path: '', component: TradeSearchComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TradeSearchRoutingModule {}
