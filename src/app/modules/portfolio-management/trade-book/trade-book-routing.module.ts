import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeBookShowComponent } from './trade-book-show/trade-book-show.component';
import { TradeBookComponent } from './trade-book.component';

const routes: Routes = [
    {
        path: '',
        component: TradeBookComponent,
    },
    {
        path: ':date/:org/:ticker/:pamCode',
        component: TradeBookShowComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TradeBookRoutingModule {}
