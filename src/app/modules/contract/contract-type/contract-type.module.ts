import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractTypeComponent } from './contract-type.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractTypeComponent }];

@NgModule({
    declarations: [ContractTypeComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ContractTypeModule {}
