import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardboardListComponent } from './cardboard-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CardboardComponent } from './cardboard/cardboard.component';
import { CardboardNoteComponent } from './cardboard/cardboard-note/cardboard-note.component';
import { CardboardHistoryComponent } from './cardboard/cardboard-history/cardboard-history.component';
import { CardboardFormComponent } from './cardboard/cardboard-form/cardboard-form.component';
import { LayoutModule } from '../../../layout/layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '#shared/pipes/pipes.module';
import { CardboardContractInfoComponent } from './cardboard/cardboard-contract-info/cardboard-contract-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfirmationDialogModule } from '#shared/components/confirmation-dialog/confirmation-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardboardNoteDialogComponent } from './cardboard/cardboard-note-dialog/cardboard-note-dialog.component';
import { ShareModule } from '#shared/share.module';

const routes: Routes = [
    { path: ':id', pathMatch: 'full', component: CardboardComponent },
    { path: '', pathMatch: 'full', component: CardboardListComponent },
];

@NgModule({
    declarations: [
        CardboardListComponent,
        CardboardComponent,
        CardboardNoteComponent,
        CardboardHistoryComponent,
        CardboardFormComponent,
        CardboardContractInfoComponent,
        CardboardNoteDialogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        PipesModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        ConfirmationDialogModule,
        MatTooltipModule,
        FormsModule,
        ShareModule
    ],
    exports: [CardboardListComponent],
})
export class CardboardListModule {}
