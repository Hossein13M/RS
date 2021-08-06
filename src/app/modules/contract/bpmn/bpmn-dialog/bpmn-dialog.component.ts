import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { UserService } from '../../../organizations-structure/user/user.service';
import { Units, User } from '../../../organizations-structure/user/user.model';

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
    public formDropListData: Array<any> = [];
    public buttonFormArray: FormArray;

    public form: FormGroup = this.fb.group({
        selectiveUsers: [],
        units: [],
        initializer: [false, Validators.required],
    });
    public formTools: Array<{ type: string; name: string; icon?: string; imageLink?: string; disabled: boolean }> = [
        { type: 'button', name: 'دکمه', icon: 'donut_large', disabled: false },
        { type: 'button', name: 'ابزارهای جدید به زودی', imageLink: '../../../../../assets/images/coming-soon.png', disabled: true },
    ];
    constructor(
        public dialogRef: MatDialogRef<BpmnDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getOrganizationUsers();
        this.getOrganizationUnits();
        this.form.get('units').valueChanges.subscribe((v) => console.log(v));
    }

    private getOrganizationUsers(): any {
        this.userService.getUsers([`${this.activeOrganizationCode}`]).subscribe((response) => (this.users = response.items));
    }

    public submitForm(): void {
        const data: { selectiveUsers: [number]; units?: { unit: number; roles: [number] }; initializer: boolean } = this.prepareDataToSend();
        console.log(data);
    }

    private prepareDataToSend(): { selectiveUsers: [number]; units?: { unit: number; roles: [number] }; initializer: boolean } {
        const data = {
            selectiveUsers: this.form.value.selectiveUsers,
            units: { unit: this.form.value.units[0], roles: this.form.value.roles },
            initializer: this.form.value.initializer,
        };
        if (!this.form.get('units').value.length) {
            delete data.units;
        }
        return data;
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

    public detectChanges(event: any) {
        if (event.value._checked) {
            this.getRolesOnSpecificUnits(event.value.value);
            this.form.addControl('roles', new FormControl(Validators.required));
        } else {
            this.rolesOnUnit = [];
            this.form.removeControl('roles');
        }
    }

    //    refactor needs:
    drop(event: CdkDragDrop<any>): void {
        console.log('kir');
        console.log(event);
        if (event.previousContainer === event.container) {
            this.formDropListData = this.buttonFormArray.value;
            this.formDropListData[event.container.id].Value.splice(
                event.currentIndex,
                0,
                this.formDropListData[event.container.id].Value.splice(event.previousIndex, 1)[0]
            );
            this.createForm();
        } else {
            if (event.previousContainer.id === 'Base') {
                if (!(event.container.data.length >= 100)) {
                    this.formDropListData = this.buttonFormArray.value;
                    this.formDropListData[event.container.id].Value.splice(event.currentIndex, 0, 'button');
                    this.createForm();
                }
            } else {
                if (!(event.container.data.length >= 100)) {
                    this.formDropListData = this.buttonFormArray.value;
                    this.formDropListData[event.container.id].Value.splice(
                        event.currentIndex,
                        0,
                        this.formDropListData[event.previousContainer.id].Value[event.previousIndex]
                    );
                    this.formDropListData[event.previousContainer.id].Value.splice(event.previousIndex, 1);
                    this.createForm();
                }
            }
        }
    }

    public deleteItem(j: number): void {
        const valueFormArray = (this.buttonFormArray.at(0) as FormGroup).controls?.Value as FormArray;
        this.formDropListData.splice(j, 1);
        valueFormArray.removeAt(j);
    }

    createForm(): void {
        console.log(this.buttonFormArray);
        // this.buttonFormArray = this.fb.array(
        //     this.formDropListData.map((item) => {
        //         return this.fb.group({
        //             name: this.fb.control(item.name),
        //             Value: this.fb.array(
        //                 item.Value.map((form) => {
        //                     return this.fb.group(form);
        //                 })
        //             ),
        //         });
        //     })
        // );
    }
}
