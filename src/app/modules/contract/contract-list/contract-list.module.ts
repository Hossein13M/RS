import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractListComponent } from './contract-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ContractService } from './contract.service';
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';
import { ShareModule } from '#shared/share.module';
import { LayoutModule } from '../../../layout/layout.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ContractHistoryDialogComponent } from './contract-history-dialog/contract-history-dialog.component';
import { ContractNoteDialogComponent } from './contract-note-dialog/contract-note-dialog.component';
import { CardboardHistoryModule } from '../contract-cardboard/cardboard/cardboard-history/cardboard-history.module';
import { CardboardNoteModule } from '../contract-cardboard/cardboard/cardboard-note/cardboard-note.module';
import { ContractFinalFormDialogComponent } from './contract-final-form-dialog/contract-final-form-dialog.component';
import { ContractViewerService } from '../contract-viewer/contract-viewer.service';
import { MatChipsModule } from '@angular/material/chips';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractListComponent }];

@NgModule({
    declarations: [
        ContractListComponent,
        ContractDialogComponent,
        ContractHistoryDialogComponent,
        ContractNoteDialogComponent,
        ContractFinalFormDialogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ShareModule,
        LayoutModule,
        MatButtonToggleModule,
        CardboardHistoryModule,
        CardboardNoteModule,
        MatChipsModule,
    ],
    providers: [ContractService, ContractViewerService],
    entryComponents: [ContractDialogComponent],
})
export class ContractListModule {}
