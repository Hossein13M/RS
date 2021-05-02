import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableDialogData } from 'app/shared/components/table-dialog/table-dialog.component';
import { PricePipeService } from 'app/shared/pipes/price-pipe.service';

@Component({
    selector: 'app-change-price-dialog',
    template: `
        <h2 mat-dialog-title style="text-align: center;margin-top: 20px;font-weight: normal">تغییر نمایش قیمت‌ها</h2>
        <hr />
        <div mat-dialog-content class="form-container" dir="rtl" [formGroup]="form">
            <mat-form-field appearance="outline">
                <mat-label>یکای پول</mat-label>
                <mat-select formControlName="unit">
                    <mat-option value="rial">ریال</mat-option>
                    <mat-option value="toman">تومان</mat-option>
                </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>مقیاس قیمت‌ها</mat-label>
                <mat-select formControlName="scale">
                    <mat-option [value]="0">یک</mat-option>
                    <mat-option [value]="3">هزار </mat-option>
                    <mat-option [value]="6">میلیون </mat-option>
                    <mat-option [value]="9">میلیارد </mat-option>
                    <mat-option [value]="12">هزار میلیارد </mat-option>
                </mat-select>
            </mat-form-field>
        </div>
    `,
    styles: [
        `
            .form-container {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                padding: 0;
                width: 100%;
            }

            mat-form-field {
                min-width: 150px;
                margin: 10px;
            }
        `,
    ],
})
export class ChangePriceDialogComponent {
    form: FormGroup = this.formBuilder.group({ scale: [this.pricePipeService.downScaleOrder], unit: ['rial', [Validators.required]] });

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: TableDialogData,
        public dialogRef: MatDialogRef<ChangePriceDialogComponent>,
        private formBuilder: FormBuilder,
        private pricePipeService: PricePipeService
    ) {
        const unitPrice = JSON.parse(localStorage.getItem('priceUnit')) ?? { unit: 'rial', scale: 9 };
        this.form.setValue(unitPrice);

        this.form.valueChanges.subscribe((newValue) => {
            let finalScale = newValue.scale;
            switch (newValue.unit) {
                case 'rial':
                    break;
                case 'toman':
                    finalScale += 1;
                    break;
                default:
                    break;
            }
            this.pricePipeService.downScaleOrder = parseInt(finalScale, 10);
            if (finalScale > 6) this.pricePipeService.decimalInfo = '1.0-3';
            localStorage.setItem('priceUnit', JSON.stringify(this.form.value));
        });
    }
}
