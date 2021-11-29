import { NgModule } from '@angular/core';
import { MessagingModule } from './mails/messaging.module';
import { OpRiskModule } from './op-risk/op-risk.module';
import { TestModule } from './test/test.module';
import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { GlModule } from './gl/gl.module';
import { RouterModule } from '@angular/router';
import { ModulesRoutingModule } from './modules.routing.module';
import { CommonModule } from '@angular/common';
import { AlarmingModule } from './alarming/alarming.module';
import { AssetsMonitoringModule } from './assets-monitoring/assets-monitoring.module';
import { AUMModule } from './aum/aum.module';
import { ComplianceModule } from './compliance/compliance.module';
import { ContractModule } from './contract/contract.module';
import { NavModule } from './nav/nav.module';
import { OrganizationStructureModule } from './organizations-structure/organization-structure.module';
import { PortfolioManagementModule } from './portfolio-management/portfolio-management.module';
import { RiskMeasurementModule } from './risk-measurement/risk-measurement.module';
import { SystemSettingsModule } from './system-settings/system-settings.module';
import { WelcomeModule } from './welcome/welcome.module';
import { ModulesComponent } from './modules.component';

@NgModule({
    declarations: [ModulesComponent],
    imports: [
        CommonModule,
        RouterModule,
        ModulesRoutingModule,
        MaterialModule,
        ShareModule,
        // application modules
        AlarmingModule,
        AssetsMonitoringModule,
        AUMModule,
        ComplianceModule,
        ContractModule,
        GlModule,
        MessagingModule,
        NavModule,
        OpRiskModule,
        OrganizationStructureModule,
        PortfolioManagementModule,
        RiskMeasurementModule,
        SystemSettingsModule,
        WelcomeModule,
        TestModule,
    ],
    exports: [ModulesRoutingModule],
})
export class ModulesModule {}
