import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { UserService } from '../../../organizations-structure/user/user.service';
import { Units, User } from '../../../organizations-structure/user/user.model';
import { BPMNButtonForm, BpmnData, BpmnStepTool } from '../bpmn.model';
import { FlowService } from '../../flow/flow.service';
import { Flow } from '../../flow/flow.model';
import { BpmnService } from '../bpmn.service';
import { AlertService } from '#services/alert.service';
import { ContractFormButtonTypes } from '../../cardboard-list/cardboard.model';

@Component({
    selector: 'app-bpmn-dialog',
    templateUrl: './bpmn-dialog.component.html',
    styleUrls: ['./bpmn-dialog.component.scss'],
})
export class BpmnDialogComponent implements OnInit {
    private activeOrganizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public users: Array<User> = [];
    public units: Units;
    public rolesOnUnit: Array<{ childId: number; id: number; name: string }> = [];
    private data: BpmnData = {
        step: '',
        flow: '',
        isNewStep: false,
        name: '',
        attributes: [],
        accessRights: { units: { unit: 0, roles: [] }, users: [], initializer: false },
    };
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public flowDetails: Flow;

    public buttonTypes: Array<{ perName: string; engName: ContractFormButtonTypes; isAvailable: boolean }> = [
        { perName: 'آپلود', engName: 'upload', isAvailable: true },
        { perName: 'دانلود', engName: 'download', isAvailable: true },
        { perName: 'تایید', engName: 'accept', isAvailable: false },
        { perName: 'رد', engName: 'reject', isAvailable: false },
        { perName: 'گرفتن کد قرارداد', engName: 'code', isAvailable: true },
    ];
    public form: FormGroup = this.fb.group({
        users: [],
        units: [],
        initializer: [false, Validators.required],
    });
    public formTools: Array<BpmnStepTool> = [
        { type: 'button', name: 'دکمه', icon: 'donut_large', disabled: false },
        { type: 'button', name: 'ابزارهای جدید به زودی', imageLink: '../../../../../assets/images/coming-soon.png', disabled: true },
    ];

    public formArray: FormArray = this.fb.array([]);

    constructor(
        public dialogRef: MatDialogRef<BpmnDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: { flowId: string; stateId: string; stateName: string },
        private userService: UserService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private flowService: FlowService,
        private bpmnService: BpmnService,
        private alertSerice: AlertService
    ) {
        this.addDefaultButtons();
    }

    private addDefaultButtons() {
        const acceptButton = this.fb.group({ name: ['تایید'], type: ['accept'], isDefaultButton: [true] });
        const rejectButton = this.fb.group({ name: ['رد'], type: ['reject'], isDefaultButton: [true] });
        this.formArray.push(acceptButton);
        this.formArray.push(rejectButton);
    }

    ngOnInit(): void {
        this.getOrganizationUsers();
        this.getOrganizationUnits();
        this.getFlowDetails();
        this.form.get('units').valueChanges.subscribe((v) => {
            this.getRolesOnSpecificUnits(v);
            this.form.addControl('roles', new FormControl(Validators.required));
        });
    }

    private getFlowDetails(): void {
        const pagination: { limit: number; skip: number } = { limit: 100, skip: 0 };
        this.flowService.getSingleFlowDetails({ organization: this.organizationCode, id: this.dialogData.flowId, ...pagination }).subscribe((response) => {
            this.flowDetails = response.items[0];
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
        !this.data.isNewStep && this.getStepInfo();
    }

    private getOrganizationUsers(): any {
        this.userService.getUsers([`${this.activeOrganizationCode}`]).subscribe((response) => (this.users = response.items));
    }

    public submitForm(): void {
        this.prepareAccessRights();
        this.data.attributes = this.formArray.value;
        this.bpmnService.saveBpmnStep(this.data).subscribe(
            () => this.alertSerice.onSuccess('افزوده شد'),
            () => this.alertSerice.onError('مشکلی پیش آمده‌است')
        );
    }

    private prepareAccessRights() {
        this.data.accessRights = {
            units: {
                unit: this.form.get('units').value[0],
                roles: this.form.get('roles').value,
            },
            initializer: this.form.get('initializer').value,
            users: [],
        };
        this.users.map((user) => {
            if (this.form.get('users').value.includes(user.id)) {
                this.data.accessRights.users.push({ userId: user.id, isDefault: false, username: user.fullname });
            }
        });
        // this.form.get('users').value.map((user) => this.data.accessRights.users.push({ userId: user.id, isDefault: false, username: user.fullname }));
    }

    private getOrganizationUnits(): void {
        this.userService.getOrganizationUnits([this.activeOrganizationCode]).subscribe((response) => (this.units = response));
    }

    private getRolesOnSpecificUnits(unitId: number): void {
        this.units.children.map((item) => {
            if (item.id === unitId) {
                this.rolesOnUnit = item.mappings;
            }
        });
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
        this.formArray.insert(
            0,
            this.fb.group({
                name: [toolInfo ? toolInfo.name : ''],
                type: [toolInfo ? toolInfo.type : 'upload'],
                isDefaultButton: [toolInfo ? toolInfo.isDefaultButton : false],
            })
        );
    }

    public removeTool(index: number) {
        this.formArray.removeAt(index);
    }

    private setFormDataInEditMode(response: BpmnData) {
        const userIdList = [];
        this.form.get('initializer').setValue(response.accessRights.initializer);
        response.accessRights.users.map((user) => userIdList.push(user.userId));
        this.form.get('users').setValue(userIdList);
        this.form.get('units').setValue([response.accessRights.units.unit]);
        this.detectChanges({ value: { value: response.accessRights.units.unit, _checked: true } }, response.accessRights.units.roles);
        response.attributes.map((attr) => !attr.isDefaultButton && this.addTool(attr));
    }
}
