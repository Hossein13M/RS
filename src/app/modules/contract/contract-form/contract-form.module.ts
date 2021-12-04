import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContractFormComponent } from './contract-form.component';
import { ContractFormDialogComponent } from './contract-form-dialog/contract-form-dialog.component';
import { ContractFormService } from './contract-form.service';
import { LayoutModule } from '../../../layout/layout.module';
import { ShareModule } from '#shared/share.module';
import { AgFormBuilderModule } from 'ag-form-builder';
import { HeaderModule } from '../../../layout/components/header/header.module';
import { ContractFormDuplicateDialogComponent } from './contract-form-dialog/contract-form-duplicate-dialog/contract-form-duplicate-dialog.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractFormComponent }];

@NgModule({
    declarations: [ContractFormComponent, ContractFormDialogComponent, ContractFormDuplicateDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MatButtonModule, MatIconModule, ShareModule, AgFormBuilderModule, HeaderModule],
    entryComponents: [ContractFormDialogComponent],
    providers: [ContractFormService],
})
export class ContractFormModule {}
