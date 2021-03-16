import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseOperatorItemDto } from 'app/services/API/models';
import { OperatorManagmentService } from 'app/services/App/user/operator-managment.service';

@Component({
    selector: 'app-add-operator',
    templateUrl: './add-operator.component.html',
    styleUrls: ['./add-operator.component.scss'],
})
export class AddOperatorComponent {
    action: string;
    operator: ResponseOperatorItemDto;
    operatorForm: FormGroup;
    userForm: FormGroup;
    dialogTitle: string;
    hide = true;
    createUser = false;
    loading: boolean;

    constructor(
        public matDialogRef: MatDialogRef<AddOperatorComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private operatorService: OperatorManagmentService,
        private snackBar: MatSnackBar
    ) {
        // Set the defaults
        this.action = _data.action;
        if (this.action === 'edit') {
            this.dialogTitle = 'اصلاح اپراتور';
            this.operator = _data.operator;
            this.createUser = false;
        } else {
            this.dialogTitle = 'اپراتور جدید';
            this.operator = {} as ResponseOperatorItemDto;
        }
        this.operatorForm = this.createOperatorForm();
        this.userForm = this.createUserForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createOperatorForm(): FormGroup {
        return this._formBuilder.group({
            firstName: [this.operator.firstName],
            lastName: [this.operator.lastName],
            email: [this.operator.email, [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        });
    }

    createUserForm(): FormGroup {
        return this._formBuilder.group({
            userName: [this.operator.userName, Validators.required],
            mobileNumber: [
                this.operator.mobileNumber,
                [
                    Validators.required,
                    Validators.pattern('(0|\\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]' + '([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}'),
                ],
            ],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    editOperator(): void {
        if (this.operatorForm.dirty) {
            this.operatorService
                .editOperator(
                    this.operator.id,
                    this.operatorForm.controls['firstName'].value,
                    this.operatorForm.controls['lastName'].value,
                    this.operatorForm.controls['email'].value
                )
                .subscribe(() => {
                    this.snackBar.open('اپراتور با موفقیت اصلاح شد', '', { panelClass: 'snack-success', direction: 'rtl', duration: 3000 });
                });
        }

        if (this.operator.userName) this.matDialogRef.close();
        else {
            if (this.createUser) {
                this.operatorService
                    .addUser(
                        this.operator.id,
                        this.userForm.controls['userName'].value,
                        this.userForm.controls['mobileNumber'].value,
                        this.userForm.controls['password'].value
                    )
                    .subscribe(
                        () => this.matDialogRef.close(),
                        () =>
                            this.snackBar.open('اطلاعات تکراری وارد شده است', '', {
                                panelClass: 'snack-error',
                                direction: 'rtl',
                                duration: 3000,
                            })
                    );
            }
        }
    }

    newOperator(): void {
        if (this.createUser) {
            this.loading = true;
            this.operatorService
                .addOperator(
                    this.operatorForm.controls['firstName'].value,
                    this.operatorForm.controls['lastName'].value,
                    this.operatorForm.controls['email'].value
                )
                .subscribe((res) => {
                    this.operatorService
                        .addUser(
                            res.id,
                            this.userForm.controls['userName'].value,
                            this.userForm.controls['mobileNumber'].value,
                            this.userForm.controls['password'].value
                        )
                        .subscribe();
                    this.loading = false;
                    this.matDialogRef.close();
                });
        } else {
            this.loading = true;
            this.operatorService
                .addOperator(
                    this.operatorForm.controls['firstName'].value,
                    this.operatorForm.controls['lastName'].value,
                    this.operatorForm.controls['email'].value
                )
                .subscribe(
                    () => {
                        this.loading = false;
                        // this.snotifyService.success("اپراتور با موفقیت ثبت شد")
                        this.snackBar.open('اپراتور با موفقیت ثبت شد', '', {
                            panelClass: 'snack-success',
                            direction: 'rtl',
                            duration: 3000,
                        });
                        this.matDialogRef.close();
                    },
                    () =>
                        // this.snotifyService.error("ایمیل تکراری است", "اپراتور ثبت نشد")
                        this.snackBar.open('اطلاعات تکراری وارد شده است', '', {
                            panelClass: 'snack-error',
                            direction: 'rtl',
                            duration: 3000,
                        })
                );
        }
    }
}
