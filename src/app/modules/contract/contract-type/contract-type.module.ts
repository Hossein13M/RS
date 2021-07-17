import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractTypeComponent } from './contract-type.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '../../../layout/layout.module';
import { MatButtonModule } from '@angular/material/button';
import { ShareModule } from '#shared/share.module';
import { ContractTypeDialogComponent } from './contract-type-dialog/contract-type-dialog.component';
import { UserService } from '../../organizations-structure/user/user.service';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractTypeComponent }];

@NgModule({
    declarations: [ContractTypeComponent, ContractTypeDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), MatIconModule, LayoutModule, MatButtonModule, ShareModule],
    entryComponents: [ContractTypeDialogComponent],
    providers: [UserService],
})
export class ContractTypeModule {}
