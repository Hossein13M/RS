import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { ShareModule } from 'app/shared/share.module';
import { MaterialModule } from '#shared/material.module';
import { TradeBookHistoryComponent } from './trade-book-history/trade-book-history.component';
import { TradeBookRoutingModule } from './trade-book-routing.module';
import { TradeBookShowComponent } from './trade-book-show/trade-book-show.component';
import { TradeBookComponent } from './trade-book.component';
import { TradeBookService } from './trade-book.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [TradeBookComponent, TradeBookShowComponent, TradeBookHistoryComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TradeBookRoutingModule,
        MatSortModule,
        LayoutModule,
        ShareModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatProgressBarModule,
    ],
    providers: [TradeBookService],
    entryComponents: [TradeBookHistoryComponent],
    exports: [TradeBookComponent],
})
export class TradeBookModule {}
