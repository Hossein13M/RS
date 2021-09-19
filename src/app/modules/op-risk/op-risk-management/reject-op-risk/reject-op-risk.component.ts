import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { OpLossManagementService } from '../op-loss-management.service';
import { OpRiskManagementService } from '../op-risk-management.service';

@Component({
    selector: 'app-reject-op-risk',
    templateUrl: './reject-op-risk.component.html',
    styleUrls: ['./reject-op-risk.component.scss'],
})
export class RejectOpRiskComponent implements OnInit {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<RejectOpRiskComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private opRiskManagementService: OpRiskManagementService,
        private opLossManagementService: OpLossManagementService,
        private AlertService: AlertService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            rejectReason: '',
            id: this.data.id,
        });
    }

    onReject() {
        if (this.data.type == 'risk') {
            const data = { opRiskId: this.form.value.id, rejectReason: this.form.value.rejectReason };
            this.opRiskManagementService.rejectOpRisk(data).subscribe((response) => {
                this.AlertService.onSuccess('ریسک با موفقیت رد شد');
                this.dialogRef.close(true);
            });
        } else {
            const data = { opLossId: this.form.value.id, rejectReason: this.form.value.rejectReason };
            this.opLossManagementService.rejectOpLose(data).subscribe((response) => {
                this.AlertService.onSuccess('زیان با موفقیت رد شد');
                this.dialogRef.close(true);
            });
        }
    }

    close() {
        this.dialogRef.close(false);
    }
}
