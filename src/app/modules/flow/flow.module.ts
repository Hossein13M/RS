import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { ShareModule } from 'app/shared/share.module';
import { AddFlowCategoryComponent } from './flow-category/add-flow-category/add-flow-category.component';
import { FlowCategoryComponent } from './flow-category/flow-category.component';
import { AddFlowInstanceComponent } from './flow-instance/add-flow-instance/add-flow-instance.component';
import { FlowInstanceComponent } from './flow-instance/flow-instance.component';
import { BpmnComponent } from './flow-maker/bpmn/bpmn.component';
import { EndStateSettingDialogComponent } from './flow-maker/form-builder/end-state-setting-dialog/end-state-setting-dialog.component';
import { FormBuilderComponent } from './flow-maker/form-builder/form-builder.component';
import { FormButtonComponent } from './flow-maker/form-builder/form-element/form-components/form-button/form-button.component';
import { FormDateComponent } from './flow-maker/form-builder/form-element/form-components/form-date/form-date.component';
import { FormNumberComponent } from './flow-maker/form-builder/form-element/form-components/form-number/form-number.component';
import { FormTextFieldComponent } from './flow-maker/form-builder/form-element/form-components/form-text-field/form-text-field.component';
import { FormTitleComponent } from './flow-maker/form-builder/form-element/form-components/form-title/form-title.component';
import { FormElementComponent } from './flow-maker/form-builder/form-element/form-element.component';
import { SaveDialogComponent } from './flow-maker/form-builder/save-dialog/save-dialog.component';
import { ReplacePipe } from './flow-maker/form-builder/show-code-dialog/replace-pipe';
import { ShowCodeDialogComponent } from './flow-maker/form-builder/show-code-dialog/show-code-dialog.component';
import { FlowRoutingModule } from './flow-routing.module';
import { FlowWizardHistoryDialogComponent } from './flow-wizard-history-dialog/flow-wizard-history-dialog.component';
import { AddCommentDialogComponent } from './flow-wizard-history/add-comment-dialog/add-comment-dialog.component';
import { FlowWizardHistoryComponent } from './flow-wizard-history/flow-wizard-history.component';
import { FlowWizardComponent } from './flow-wizard/flow-wizard.component';
import { StopReasonComponent } from './flow-wizard/stop-reason/stop-reason.component';
import { AddFlowComponent } from './flows/add-flow/add-flow.component';
import { FlowsComponent } from './flows/flows.component';
import { BusinessPlanComponent } from './forms/categories/business-plan/business-plan.component';
import { ExlcusivelyAssetManagementComponent } from './forms/categories/exlcusively-asset-management/exlcusively-asset-management.component';
import { FinancialTherapyComponent } from './forms/categories/financial-therapy/financial-therapy.component';
import { FinancingAdvisoryComponent } from './forms/categories/financing-advisory/financing-advisory.component';
import { IpoAdvisoryComponent } from './forms/categories/ipo-advisory/ipo-advisory.component';
import { ListingAdvisoryComponent } from './forms/categories/listing-advisory/listing-advisory.component';
import { MarketMakingAssinmentComponent } from './forms/categories/market-making-assinment/market-making-assinment.component';
import { MarketMakingComponent } from './forms/categories/market-making/market-making.component';
import { PurchaseHoldingAndSellComponent } from './forms/categories/purchase-holding-and-sell/purchase-holding-and-sell.component';
import { UnderWritingAndMarketMakingComponent } from './forms/categories/under-writing-and-market-making/under-writing-and-market-making.component';
import { UnderWritingComponent } from './forms/categories/under-writing/under-writing.component';
import { ValuationComponent } from './forms/categories/valuation/valuation.component';
import { ContractBaseInfoFormComponent } from './forms/contract-base-info-form/contract-base-info-form.component';
import { FormsComponent } from './forms/forms.component';
import { SecuritiesHoldingFeesInfoComponent } from './forms/modal/securities-holding-fees-info/securities-holding-fees-info.component';
import { CollateralInfoComponent } from './forms/tabs/collateral-info/collateral-info.component';
import { ContractDeliveringDocumentsInfoComponent } from './forms/tabs/contract-delivering-documents-info/contract-delivering-documents-info.component';
import { ContractPaymentsInfoComponent } from './forms/tabs/contract-payments-info/contract-payments-info.component';
import { FeeAndPettyInfoComponent } from './forms/tabs/fee-and-petty-info/fee-and-petty-info.component';
import { GuarantorInfoComponent } from './forms/tabs/guarantor-info/guarantor-info.component';
import { IntroducedCustomerInfoComponent } from './forms/tabs/introduced-customer-info/introduced-customer-info.component';
import { InvestorInventoriesInBeginngsOfContractComponent } from './forms/tabs/investor-inventories-in-beginngs-of-contract/investor-inventories-in-beginngs-of-contract.component';
import { InvoiceInfoComponent } from './forms/tabs/invoice-info/invoice-info.component';
import { MarketMakingFeesReceivingInfoComponent } from './forms/tabs/market-making-fees-receiving-info/market-making-fees-receiving-info.component';
import { SecuritiesInfoComponent } from './forms/tabs/securities-info/securities-info.component';
import { SyndicateMembersNamesComponent } from './forms/tabs/syndicate-members-names/syndicate-members-names.component';
import { VariableFeesInfoComponent } from './forms/tabs/variable-fees-info/variable-fees-info.component';
import { PipesModule } from '#shared/pipes/pipes.module';

@NgModule({
    declarations: [
        FlowsComponent,
        BpmnComponent,
        // Form Builder
        FormBuilderComponent,
        FormElementComponent,
        FormTitleComponent,
        FormDateComponent,
        FormTextFieldComponent,
        ShowCodeDialogComponent,
        FormNumberComponent,
        ReplacePipe,
        FormButtonComponent,
        FlowCategoryComponent,
        AddFlowCategoryComponent,
        FlowInstanceComponent,
        FlowWizardComponent,
        AddFlowInstanceComponent,
        AddFlowComponent,
        StopReasonComponent,
        FlowWizardHistoryDialogComponent,
        FormsComponent,
        ValuationComponent,
        MarketMakingComponent,
        UnderWritingComponent,
        UnderWritingAndMarketMakingComponent,
        BusinessPlanComponent,
        PurchaseHoldingAndSellComponent,
        FinancialTherapyComponent,
        ExlcusivelyAssetManagementComponent,
        FinancingAdvisoryComponent,
        IpoAdvisoryComponent,
        ListingAdvisoryComponent,
        MarketMakingAssinmentComponent,
        CollateralInfoComponent,
        SecuritiesHoldingFeesInfoComponent,
        SecuritiesInfoComponent,
        VariableFeesInfoComponent,
        InvestorInventoriesInBeginngsOfContractComponent,
        IntroducedCustomerInfoComponent,
        ContractDeliveringDocumentsInfoComponent,
        ContractPaymentsInfoComponent,
        SyndicateMembersNamesComponent,
        FeeAndPettyInfoComponent,
        GuarantorInfoComponent,
        MarketMakingFeesReceivingInfoComponent,
        InvoiceInfoComponent,
        ContractBaseInfoFormComponent,
        SaveDialogComponent,
        FlowWizardHistoryComponent,
        AddCommentDialogComponent,
        EndStateSettingDialogComponent,
    ],
    imports: [
        CommonModule,
        FlowRoutingModule,
        DragDropModule,
        ShareModule,
        MatBottomSheetModule,
        MatProgressSpinnerModule,
        LayoutModule,
        MatTooltipModule,
        PipesModule
    ],
    exports: [ReactiveFormsModule, DragDropModule, ShareModule, FormBuilderComponent],
    entryComponents: [
        FormBuilderComponent,
        ShowCodeDialogComponent,
        AddFlowCategoryComponent,
        AddFlowComponent,
        AddFlowInstanceComponent,
        StopReasonComponent,
        FlowWizardHistoryDialogComponent,
        SaveDialogComponent,
        AddCommentDialogComponent,
    ],
})
export class FlowModule {}
