import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeAddComponent } from './trade-add.component';

const routes: Routes = [
    {
        path: '',
        component: TradeAddComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TradeAddRoutingModule {}
