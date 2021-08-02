import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../organizations-structure/user/user.service';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { User } from '../../../organizations-structure/user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-bpmn-dialog',
    templateUrl: './bpmn-dialog.component.html',
    styleUrls: ['./bpmn-dialog.component.scss'],
})
export class BpmnDialogComponent implements OnInit {
    private activeOrganizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public users: Array<User> = [];
    public form: FormGroup = this.fb.group({
        users: [Validators.required],
        selectiveUsers: [],
    });
    constructor(
        public dialogRef: MatDialogRef<BpmnDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getOrganizationUsers();
    }

    private getOrganizationUsers(): any {
        this.userService.getUsers([`${this.activeOrganizationCode}`]).subscribe((response) => (this.users = response.items));
    }

    public submitForm(): void {
        console.log(this.form.value);
    }
}
