import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractTypeModule } from './contract-type/contract-type.module';
import { ContractListModule } from './contract-list/contract-list.module';
import { ContractRoutingModule } from './contract-routing.module';
import { ContractService } from './contract.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, ContractRoutingModule, ContractTypeModule, ContractListModule],
    providers: [ContractService],
})
export class ContractModule {}
