import { NgModule } from '@angular/core';
import { ConvertDatePipe } from '#shared/pipes/convert-date.pipe';
import { ActivePipe } from '#shared/pipes/active.pipe';
import { PriorityPipe } from '#shared/pipes/priority.pipe';
import { ReadStatusPipe } from '#shared/pipes/read-status.pipe';
import { PricePipe } from '#shared/pipes/price.pipe';

@NgModule({
    declarations: [ConvertDatePipe, ActivePipe, PriorityPipe, ReadStatusPipe, PricePipe],
    exports: [ConvertDatePipe, ActivePipe, PriorityPipe, ReadStatusPipe, PricePipe],
    providers: [ConvertDatePipe],
})
export class PipesModule {}
