/* tslint:disable */
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpRequestInterceptor } from '#shared/interceptors/http-request-interceptor.service';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';
import { AlarmService } from './services/alarm.service';
import { AssetsService } from './services/assets.service';
import { AuthItemAssignmentService } from './services/auth-item-assignment.service';
import { AuthItemChildService } from './services/auth-item-child.service';
import { AuthItemService } from './services/auth-item.service';
import { AuthService } from './services/auth.service';
import { BankAccountTypeService } from './services/bank-account-type.service';
import { BankBranchService } from './services/bank-branch.service';
import { BankService } from './services/bank.service';
import { BourseBoardService } from './services/bourse-board.service';
import { BourseInstrumentDetailService } from './services/bourse-instrument-detail.service';
import { BourseIssueDateService } from './services/bourse-issue-date.service';
import { BourseMarketService } from './services/bourse-market.service';
import { BrokerService } from './services/broker.service';
import { CanService } from './services/can.service';
import { ComplianceCalculatedService } from './services/compliance-calculated.service';
import { ComplianceFundService } from './services/compliance-fund.service';
import { ComplianceService } from './services/compliance.service';
import { CustomerService } from './services/customer.service';
import { DepositService } from './services/deposit.service';
import { EmailService } from './services/email.service';
import { EventFieldValueService } from './services/event-field-value.service';
import { EventFieldService } from './services/event-field.service';
import { EventInformPartyService } from './services/event-inform-party.service';
import { EventLevelService } from './services/event-level.service';
import { EventRelationService } from './services/event-relation.service';
import { EventReminderService } from './services/event-reminder.service';
import { EventRepetitionService } from './services/event-repetition.service';
import { EventTitleFieldService } from './services/event-title-field.service';
import { EventTitleService } from './services/event-title.service';
import { EventService } from './services/event.service';
import { FlowCategoryService } from './services/flow-category.service';
import { FlowFileService } from './services/flow-file.service';
import { FlowFormService } from './services/flow-form.service';
import { FlowHistoryService } from './services/flow-history.service';
import { FlowInstanceDataService } from './services/flow-instance-data.service';
import { FlowInstanceService } from './services/flow-instance.service';
import { FlowNoteService } from './services/flow-note.service';
import { FlowWizardService } from './services/flow-wizard.service';
import { FlowService } from './services/flow.service';
import { FrequenceService } from './services/frequence.service';
import { FundNavAssetAndDebitService } from './services/fund-nav-asset-and-debit.service';
import { FundNavUserTransactionService } from './services/fund-nav-user-transaction.service';
import { FundRealTimeNavService } from './services/fund-real-time-nav.service';
import { FundRoleService } from './services/fund-role.service';
import { FundTypeService } from './services/fund-type.service';
import { FundService } from './services/fund.service';
import { GeneralLedgerService } from './services/general-ledger.service';
import { GuarantorService } from './services/guarantor.service';
import { InstrumentGlMappingService } from './services/instrument-gl-mapping.service';
import { InstrumentTypeService } from './services/instrument-type.service';
import { InstrumentService } from './services/instrument.service';
import { IssueLicenseService } from './services/issue-license.service';
import { IssuerGoalService } from './services/issuer-goal.service';
import { IssuerService } from './services/issuer.service';
import { MarketService } from './services/market.service';
import { MessageService } from './services/message.service';
import { NewInstrumentService } from './services/new-instrument.service';
import { OperatorService } from './services/operator.service';
import { OrganizationTypeService } from './services/organization-type.service';
import { OrganiztionSupervisorService } from './services/organiztion-supervisor.service';
import { OtpService } from './services/otp.service';
import { PortfolioManagementServiceService } from './services/portfolio-management-service.service';
import { RiskShieldModuleService } from './services/risk-shield-module.service';
import { SentAlarmService } from './services/sent-alarm.service';
import { SmsService } from './services/sms.service';
import { StandardGlService } from './services/standard-gl.service';
import { SubsidiaryLedgerTypeCodesService } from './services/subsidiary-ledger-type-codes.service';
import { TradeRegistrationService } from './services/trade-registration.service';
import { UserRoleService } from './services/user-role.service';
import { UserService } from './services/user.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true,
        },

        AuthService,
        UserService,
        UserRoleService,
        OperatorService,
        AuthItemService,
        AuthItemChildService,
        AuthItemAssignmentService,
        CanService,
        OtpService,
        EventLevelService,
        EventTitleService,
        EventService,
        EventReminderService,
        EventInformPartyService,
        EventRelationService,
        EventRepetitionService,
        EventFieldService,
        EventTitleFieldService,
        EventFieldValueService,
        FlowCategoryService,
        FlowService,
        FlowNoteService,
        FlowFormService,
        FlowHistoryService,
        FlowInstanceService,
        FlowInstanceDataService,
        FlowWizardService,
        FlowFileService,
        BankService,
        GuarantorService,
        IssuerService,
        FundRoleService,
        AlarmService,
        SentAlarmService,
        EmailService,
        MessageService,
        SmsService,
        InstrumentService,
        FundTypeService,
        FrequenceService,
        FundService,
        ComplianceService,
        ComplianceFundService,
        ComplianceCalculatedService,
        FundNavAssetAndDebitService,
        FundNavUserTransactionService,
        FundRealTimeNavService,
        SubsidiaryLedgerTypeCodesService,
        StandardGlService,
        GeneralLedgerService,
        CustomerService,
        BrokerService,
        AssetsService,
        IssuerGoalService,
        IssueLicenseService,
        BourseInstrumentDetailService,
        BourseIssueDateService,
        RiskShieldModuleService,
        InstrumentGlMappingService,
        BankBranchService,
        BankAccountTypeService,
        DepositService,
        MarketService,
        InstrumentTypeService,
        NewInstrumentService,
        BourseMarketService,
        BourseBoardService,
        OrganiztionSupervisorService,
        OrganizationTypeService,
        PortfolioManagementServiceService,
        TradeRegistrationService,
        ApiConfiguration,
    ],
})
export class ApiModule {
    static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [
                {
                    provide: ApiConfiguration,
                    useValue: params,
                },
            ],
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: ApiModule, @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' + 'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
