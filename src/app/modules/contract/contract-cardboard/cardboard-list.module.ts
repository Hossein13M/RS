import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardboardListComponent } from './cardboard-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CardboardComponent } from './cardboard/cardboard.component';
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
import { CardboardConfirmDialogComponent } from './cardboard/cardboard-confirm-dialog/cardboard-confirm-dialog.component';
import { CardboardUploadDialogComponent } from './cardboard/cardboard-upload-dialog/cardboard-upload-dialog.component';
import { AgFormViewerModule } from 'ag-form-builder';
import { CardboardDownloadDialogComponent } from './cardboard/cardboard-download-dialog/cardboard-download-dialog.component';
import { CardboardHistoryModule } from './cardboard/cardboard-history/cardboard-history.module';
import { CardboardNoteModule } from './cardboard/cardboard-note/cardboard-note.module';
import { HeaderModule } from '../../../layout/components/header/header.module';

const routes: Routes = [
    { path: ':id', pathMatch: 'full', component: CardboardComponent },
    { path: '', pathMatch: 'full', component: CardboardListComponent },
];

@NgModule({
    declarations: [
        CardboardListComponent,
        CardboardComponent,
        CardboardFormComponent,
        CardboardContractInfoComponent,
        CardboardNoteDialogComponent,
        CardboardConfirmDialogComponent,
        CardboardUploadDialogComponent,
        CardboardDownloadDialogComponent,
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
        ShareModule,
        AgFormViewerModule,
        CardboardHistoryModule,
        CardboardNoteModule,
        HeaderModule
    ],
    exports: [CardboardListComponent],
})
export class CardboardListModule {}
