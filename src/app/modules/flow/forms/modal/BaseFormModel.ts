import { Directive, OnInit } from '@angular/core';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';

export class FlowInstaceData {
    flowId?: string;
    flowInstanceId?: string;
    formId?: string;
    submittedData?: any;
}

@Directive()
export class BaseFormModel implements OnInit {
    baseObj: any;

    api = '/api/v1/flow-instance-data';

    flowApiModel: FlowInstaceData = {
        flowId: '',
        flowInstanceId: '',
        formId: '',
        submittedData: '',
    };

    isWorking: any;

    constructor(public formsWrapperService: FormsWrapperService) {}

    getFormDocument(api): any {
        return this.formsWrapperService.getFormDocument(api, this);
    }

    createFormDocument(api, model): any {
        return this.formsWrapperService.createFormDocument(api, model, this);
    }

    handleError(): boolean {
        return false;
    }

    ngOnInit(): void {}
}
