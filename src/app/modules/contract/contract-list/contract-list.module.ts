import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractListComponent } from './contract-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractListComponent }];

@NgModule({
    declarations: [ContractListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ContractListModule {}
