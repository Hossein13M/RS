import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractTypeModule } from './contract-type/contract-type.module';
import { ContractListModule } from './contract-list/contract-list.module';
import { ContractRoutingModule } from './contract-routing.module';
import { ContractTypeService } from './contract-type/contract-type.service';
import { CardboardListModule } from './cardboard-list/cardboard-list.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ContractRoutingModule, ContractTypeModule, ContractListModule, CardboardListModule],
    providers: [ContractTypeService],
})
export class ContractModule {}
