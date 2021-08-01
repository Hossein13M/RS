import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractListComponent } from './contract-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ContractService } from './contract.service';
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';
import { ShareModule } from '#shared/share.module';
import { LayoutModule } from '../../../layout/layout.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractListComponent }];

@NgModule({
    declarations: [ContractListComponent, ContractDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ShareModule, LayoutModule, MatButtonToggleModule],
    providers: [ContractService],
    entryComponents: [ContractDialogComponent],
})
export class ContractListModule {}
