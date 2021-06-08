import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationStructureRoutingModule } from './organization-structure.routing.module';
import { OrganizationStructureService } from './organization-structure.service';
import { OrganizationRoleMappingDialogModule } from './organization-role-mapping-dialog/organization-role-mapping-dialog.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, OrganizationStructureRoutingModule, OrganizationRoleMappingDialogModule],
    providers: [OrganizationStructureService],
})
export class OrganizationStructureModule {}
