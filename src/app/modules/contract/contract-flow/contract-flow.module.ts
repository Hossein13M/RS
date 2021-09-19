import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContractFlowComponent } from './contract-flow.component';
import { ContractFlowDialogComponent } from './contract-flow-dialog/contract-flow-dialog.component';
import { ContractFlowService } from './contract-flow.service';
import { LayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShareModule } from '#shared/share.module';
import { HeaderModule } from '../../../layout/components/header/header.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractFlowComponent }];

@NgModule({
    declarations: [ContractFlowComponent, ContractFlowDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MatIconModule, MatButtonModule, ShareModule, HeaderModule],
    entryComponents: [ContractFlowDialogComponent],
    providers: [ContractFlowService],
})
export class ContractFlowModule {}
