import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { AlertService } from '#shared/services/alert.service';
import { UserService } from '../../../organizations-structure/user/user.service';
import { Roles, Units, User } from '../../../organizations-structure/user/user.model';
import { BPMNButtonForm, BpmnData } from '../contract-bpmn.model';
import { ContractFlowService } from '../../contract-flow/contract-flow.service';
import { Flow } from '../../contract-flow/contract-flow.model';
import { ContractBpmnService } from '../contract-bpmn.service';
import { ContractFormButtonTypes } from '../../contract-cardboard/cardboard.model';
import { StateType } from '#shared/state-type.enum';

@Component({
    selector: 'app-contract-bpmn-dialog',
    templateUrl: './contract-bpmn-dialog.component.html',
    styleUrls: ['./contract-bpmn-dialog.component.scss'],
})
export class ContractBpmnDialogComponent implements OnInit {
    public users: Array<User> = [];
    public units: Units;
    public rolesOnUnit: Array<Roles> = [];
    public taskStep: 'first' | 'last' | 'other' = 'other';
    public flowDetails: Flow;
    public stateType: StateType = StateType.INIT;
    public buttonTypes: Array<{ perName: string; engName: ContractFormButtonTypes; isAvailable: boolean }> = [
        { perName: 'آپلود', engName: 'upload', isAvailable: true },
        { perName: 'دانلود', engName: 'download', isAvailable: true },
        { perName: 'تایید', engName: 'accept', isAvailable: false },
        { perName: 'رد', engName: 'reject', isAvailable: false },
        { perName: 'گرفتن کد قرارداد', engName: 'code', isAvailable: true },
    ];
    public form: FormGroup = this.fb.group({
        accessRightType: ['static'],
        users: [],
        units: [],
        initializer: [false, Validators.required],
    });
    public formArray: FormArray = this.fb.array([]);
    private prevMatSelectValue: ContractFormButtonTypes;
    private data: BpmnData = {
        step: '',
        flow: '',
        isNewStep: false,
        name: '',
        attributes: [],
        accessRights: { units: { unit: 0, roles: [] }, users: [], initializer: false },
    };
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: { flowId: string; stateId: string; stateName: string; isStateTypeTask: boolean; bpmnProcesses },
        public dialogRef: MatDialogRef<ContractBpmnDialogComponent>,
        private userService: UserService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private flowService: ContractFlowService,
        private bpmnService: ContractBpmnService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.addDefaultButtons();
        this.getOrganizationUsers();
        this.getOrganizationUnits();
        this.getFlowDetails();
        this.form.get('units').valueChanges.subscribe((v) => {
            this.getRolesOnSpecificUnits(v);
            this.form.addControl('roles', new FormControl(Validators.required));
        });
    }

    public checkForButtonStateOnTask(buttonType: ContractFormButtonTypes): boolean {
        return (this.taskStep === 'first' || this.taskStep === 'last') && buttonType === 'upload';
    }

    public submitForm(): void {
        this.prepareAccessRights();
        this.data.attributes = this.formArray.value;
        if (!this.data.accessRights.users.length) delete this.data.accessRights.users;
        if (!this.data.accessRights.units.roles.length) delete this.data.accessRights.units;
        this.bpmnService.saveBpmnStep(this.data).subscribe(
            () => this.alertService.onSuccess('افزوده شد'),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public detectChanges(event: any, roleIds?: Array<number>) {
        if (event.value._checked) {
            this.getRolesOnSpecificUnits(event.value.value);
            this.form.addControl('roles', new FormControl(Validators.required));
            roleIds && this.form.get('roles').setValue(roleIds);
        } else {
            this.rolesOnUnit = [];
            this.form.removeControl('roles');
        }
    }

    public addTool(toolInfo?: BPMNButtonForm) {
        if (this.flowDetails.hasActiveContract) {
            this.alertService.onInfo('نمی‌توانید فرم این گام را تغییر دهید');
        }
        let firstAvailableTool;
        if (!toolInfo) {
            firstAvailableTool = this.buttonTypes.find((buttonType) => buttonType.isAvailable);
            this.buttonTypes[this.buttonTypes.indexOf(firstAvailableTool)].isAvailable = false;
        }
        this.formArray.insert(
            0,
            this.fb.group({
                name: [toolInfo ? toolInfo.name : ''],
                type: [toolInfo ? toolInfo.type : firstAvailableTool.engName],
                isDefaultButton: [toolInfo ? toolInfo.isDefaultButton : false],
            })
        );
    }

    public isAddButtonAvailable(): boolean {
        return this.formArray.length < 5;
    }

    public removeTool(buttonTypeEvent, index: number) {
        this.formArray.removeAt(index);
        let removedButtonType = this.buttonTypes.find((buttonType) => buttonType.engName === buttonTypeEvent.value.type);
        this.buttonTypes[this.buttonTypes.indexOf(removedButtonType)].isAvailable = true;
    }

    public onAccessRightTypeChange(event): void {
        this.form.reset();
        this.form.get('accessRightType').setValue(event.value);
    }

    public onButtonTypeOpen(form: AbstractControl): void {
        this.prevMatSelectValue = form.value.type;
    }

    public onButtonTypeChanges(event): void {
        this.buttonTypes[this.buttonTypes.indexOf(this.buttonTypes.find((item) => item.engName === this.prevMatSelectValue))].isAvailable = true;
        this.buttonTypes[this.buttonTypes.indexOf(this.buttonTypes.find((item) => item.engName === event.value))].isAvailable = false;
    }

    private addDefaultButtons() {
        const acceptButton = this.fb.group({ name: ['تایید'], type: ['accept'], isDefaultButton: [true] });
        const rejectButton = this.fb.group({ name: ['رد'], type: ['reject'], isDefaultButton: [true] });
        this.formArray.push(acceptButton);
        this.formArray.push(rejectButton);
    }

    private addUploadButtonOnFirstTaskAndEndEvent(): void {
        const firstTaskId = this.dialogData.bpmnProcesses['bpmn:task'][0]['_attributes'].id;
        const endEvent = this.dialogData.bpmnProcesses['bpmn:endEvent']['_attributes'].id;
        if (this.dialogData.stateId === firstTaskId || this.dialogData.stateId === endEvent) {
            this.dialogData.stateId === firstTaskId ? (this.taskStep = 'first') : (this.taskStep = 'last');
            const uploadButton = this.buttonTypes.find((buttonType) => buttonType.engName === 'upload');
            if (uploadButton.isAvailable) {
                this.addTool({ name: 'آپلود', type: 'upload', isDefaultButton: false });
            }
        }
    }

    private getFlowDetails(): void {
        const pagination: { limit: number; skip: number } = { limit: 100, skip: 0 };
        this.flowService
            .getSingleFlowDetails({
                organization: this.organizationCode,
                id: this.dialogData.flowId,
                ...pagination,
            })
            .subscribe((response) => {
                this.flowDetails = response.items[0];
                this.stateType = StateType.PRESENT;
                this.setBaseDataInfo();
            });
    }

    private getStepInfo() {
        this.bpmnService
            .getBpmnStepInfo({ step: this.dialogData.stateId, flow: this.dialogData.flowId })
            .subscribe((response) => this.setFormDataInEditMode(response));
    }

    private setBaseDataInfo() {
        this.data.name = this.dialogData.stateName;
        this.data.flow = this.dialogData.flowId;
        this.data.step = this.dialogData.stateId;
        this.data.isNewStep = !this.flowDetails.states.includes(this.dialogData.stateId);
        if (!this.data.isNewStep || !this.dialogData.isStateTypeTask) {
            this.getStepInfo();
        } else this.addUploadButtonOnFirstTaskAndEndEvent();
    }

    private getOrganizationUsers(): any {
        this.userService.getUsers().subscribe((response) => (this.users = response.items));
    }

    private prepareAccessRights() {
        if (this.form.get('accessRightType').value === 'dynamic') {
            this.users.map((user) => {
                if (this.form.get('users').value.includes(user.id)) {
                    this.data.accessRights.users.push({ userId: user.id, isDefault: false, username: user.fullname });
                }
            });
        } else {
            this.data.accessRights = {
                units: {
                    unit: !!this.form.get('units').value ? this.form.get('units').value[0] : 0,
                    roles: this.form.get('roles')?.value ?? [],
                },
                initializer: this.form.get('initializer').value,
                users: [],
            };
        }
    }

    private getOrganizationUnits(): void {
        this.userService.getOrganizationUnits().subscribe((response) => (this.units = response));
    }

    private getRolesOnSpecificUnits(unitId: number): void {
        this.userService.getOrganizationRoles([unitId]).subscribe((response) => (this.rolesOnUnit = response));
    }

    private setFormDataInEditMode(response: BpmnData) {
        this.checkForUnavailableButtons(response);
        this.form.get('accessRightType').setValue(response.accessRights?.users?.length ? 'dynamic' : 'static');
        const userIdList = [];
        this.form.get('initializer').setValue(response.accessRights.initializer);
        if (response.accessRights?.users?.length) response.accessRights.users.map((user) => userIdList.push(user.userId));
        if (response.accessRights?.units) this.form.get('units').setValue([response.accessRights.units.unit]);
        this.form.get('users').setValue(userIdList);
        if (!!response.accessRights.units) {
            this.detectChanges({ value: { value: response.accessRights.units.unit, _checked: true } }, response.accessRights.units.roles);
        }
        response.attributes.map((attr) => !attr.isDefaultButton && this.addTool(attr));
        this.addUploadButtonOnFirstTaskAndEndEvent();
    }

    private checkForUnavailableButtons(responseFromServer: BpmnData): void {
        let nullButtons = [];
        this.buttonTypes.map((buttonType) => {
            responseFromServer.attributes.map((item) => item.type === buttonType.engName && nullButtons.push(item.type));
        });

        this.buttonTypes.map((buttonType) => (buttonType.isAvailable = !nullButtons.includes(buttonType.engName)));
    }
}
