import { NgModule } from '@angular/core';
import { CardboardNoteComponent } from './cardboard-note.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { PipesModule } from '#shared/pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [CardboardNoteComponent],
    imports: [MatCardModule, MatIconModule, MatTooltipModule, CommonModule, PipesModule, MatButtonModule],
    exports: [CardboardNoteComponent],
})
export class CardboardNoteModule {}
