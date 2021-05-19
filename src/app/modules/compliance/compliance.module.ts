import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app/shared/share.module';
import { CalculatedComplianceComponent } from './calculated-compliance/calculated-compliance.component';
import { ComplianceFundComponent } from './compliance-fund/compliance-fund.component';
import { ComplianceRoutingModule } from './compliance-routing.module';
import { CompliancesComponent } from './compliances-list/compliances.component';
import { CompliancesService } from './compliances.service';
import { ComplianceAddComponent } from './compliances-list/compliance-add/compliance-add.component';

@NgModule({
    declarations: [CompliancesComponent, ComplianceAddComponent, ComplianceFundComponent, CalculatedComplianceComponent, ComplianceAddComponent],
    imports: [CommonModule, ComplianceRoutingModule, ShareModule],
    entryComponents: [ComplianceFundComponent, ComplianceAddComponent],
    providers: [CompliancesService],
})
export class ComplianceModule {}
