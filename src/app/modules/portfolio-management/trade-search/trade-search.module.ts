import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { NoDataModule } from 'app/shared/components/no-data/no-data.module';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TradeSearchRoutingModule } from './trade-search-routing.module';
import { TradeSearchComponent } from './trade-search.component';
import { HeaderModule } from '../../../layout/components/header/header.module';

@NgModule({
    declarations: [TradeSearchComponent],
    imports: [
        CommonModule,
        TradeSearchRoutingModule,
        MaterialModule,
        ShareModule,
        LayoutModule,
        NgxMatSelectSearchModule,
        MatTooltipModule,
        NoDataModule,
        HeaderModule
    ]
})
export class TradeSearchModule {}
