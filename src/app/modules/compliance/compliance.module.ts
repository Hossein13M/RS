import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app/shared/share.module';
import { CalculatedComplianceComponent } from './calculated-compliance/calculated-compliance.component';
import { ComplianceFundComponent } from './compliance-fund/compliance-fund.component';
import { ComplianceRoutingModule } from './compliance-routing.module';
import { CompliancesComponent } from './compliances-list/compliances.component';
import { CompliancesService } from './compliances.service';
import { ComplianceAddComponent } from './compliances-list/compliance-add/compliance-add.component';
import { CompliancesFundComponent } from './compliances-list/compliances-fund/compliances-fund.component';
import { CompliancesFundAddComponent } from './compliances-list/compliances-fund/compliances-fund-add/compliances-fund-add.component';

@NgModule({
    declarations: [
        CompliancesComponent,
        ComplianceAddComponent,
        ComplianceFundComponent,
        CalculatedComplianceComponent,
        ComplianceAddComponent,
        CompliancesFundComponent,
        CompliancesFundAddComponent,
    ],
    imports: [CommonModule, ComplianceRoutingModule, ShareModule],
    entryComponents: [ComplianceFundComponent, ComplianceAddComponent, CompliancesFundComponent, CompliancesFundAddComponent],
    providers: [CompliancesService],
})
export class ComplianceModule {}
