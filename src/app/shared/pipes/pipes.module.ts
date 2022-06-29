import { NgModule } from '@angular/core';
import { ConvertDatePipe } from '#shared/pipes/convert-date.pipe';
import { ActivePipe } from '#shared/pipes/active.pipe';
import { PriorityPipe } from '#shared/pipes/priority.pipe';
import { ReadStatusPipe } from '#shared/pipes/read-status.pipe';
import { PricePipe } from '#shared/pipes/price.pipe';
import { TranslatorPipe } from '#shared/pipes/translator.pipe';

@NgModule({
    declarations: [ConvertDatePipe, ActivePipe, PriorityPipe, ReadStatusPipe, PricePipe, TranslatorPipe],
    exports: [ConvertDatePipe, ActivePipe, PriorityPipe, ReadStatusPipe, PricePipe, TranslatorPipe],
    providers: [ConvertDatePipe],
})
export class PipesModule {}
