import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetFlowCategoryDto } from 'app/services/API/models';
import { FlowsService } from 'app/services/App/flow/flow.service';

@Component({
    selector: 'app-add-flow-category',
    templateUrl: './add-flow-category.component.html',
    styleUrls: ['./add-flow-category.component.scss'],
})
export class AddFlowCategoryComponent {
    action: string;
    category: GetFlowCategoryDto;
    categoryForm: FormGroup;
    dialogTitle: string;
    hide = true;
    loading: boolean;

    constructor(
        public matDialogRef: MatDialogRef<AddFlowCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private flowService: FlowsService,
        private snackBar: MatSnackBar
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'اصلاح دسته بندی';
            this.category = _data.category;
        } else {
            this.dialogTitle = 'دسته بندی جدید';
            this.category = {} as GetFlowCategoryDto;
        }

        this.categoryForm = this.createCategoryForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createCategoryForm(): FormGroup {
        return this._formBuilder.group({
            name: [this.category.name],
            keyword: [this.category.keyword],
        });
    }

    editCategory(): void {
        this.loading = true;

        this.flowService.editFlowCategory(this.categoryForm.controls['name'].value, this.categoryForm.controls['keyword'].value, this.category._id).subscribe(
            (r) => {
                this.snackBar.open('دسته بندی با موفقیت اصلاح شد', '', {
                    panelClass: 'snack-success',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.matDialogRef.close();
            },
            (err) => {
                this.snackBar.open('اطلاعات تکراری وارد شده است', '', {
                    panelClass: 'snack-error',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.loading = false;
            }
        );
    }

    newCategory(): void {
        this.loading = true;

        this.flowService.addFlowCategory(this.categoryForm.controls['name'].value, this.categoryForm.controls['keyword'].value).subscribe(
            (res) => {
                this.snackBar.open('دسته بندی با موفقیت ثبت شد', '', {
                    panelClass: 'snack-success',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.loading = false;
                this.matDialogRef.close();
            },
            (error) => {
                this.snackBar.open('اطلاعات تکراری وارد شده است', '', {
                    panelClass: 'snack-error',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.loading = false;
            }
        );
    }
}
