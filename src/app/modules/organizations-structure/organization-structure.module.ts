import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationStructureRoutingModule } from './organization-structure.routing.module';
import { OrganizationStructureService } from './organization-structure.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, OrganizationStructureRoutingModule],
    providers: [OrganizationStructureService],
})
export class OrganizationStructureModule {}
