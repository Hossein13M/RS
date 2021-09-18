import { NgModule } from '@angular/core';
import { CardboardHistoryComponent } from './cardboard-history.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { PipesModule } from '#shared/pipes/pipes.module';

@NgModule({
    declarations: [CardboardHistoryComponent],
    imports: [
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
        CommonModule,
        PipesModule
    ],
    exports: [CardboardHistoryComponent],

})
export class CardboardHistoryModule {}
