import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { AlertService } from '#shared/services/alert.service';
import { SyndicateMembersName } from '../../models/syndicate-members-name';

@Component({
    selector: 'app-syndicate-members-names',
    templateUrl: './syndicate-members-names.component.html',
    styleUrls: ['./syndicate-members-names.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SyndicateMembersNamesComponent implements OnInit {
    public ELEMENT_DATA: SyndicateMembersName[] = [];
    public dataSource = new MatTableDataSource<SyndicateMembersName>(this.ELEMENT_DATA);
    public displayedColumns = ['name', 'sharePercent', 'edit'];

    public selectedSyndicateMemberIndex: number;
    public syndicateMemberForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        sharePercent: new FormControl(''),
    });

    @Input('data') set data(value: Array<SyndicateMembersName>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<SyndicateMembersName>(this.ELEMENT_DATA);
    }

    @Output() newData = new EventEmitter();

    constructor(private AlertService: AlertService) {}

    editSyndicateMember(syndicateMember, index): void {
        this.selectedSyndicateMemberIndex = index;
        this.syndicateMemberForm.controls['name'].setValue(syndicateMember.name);
        this.syndicateMemberForm.controls['sharePercent'].setValue(syndicateMember.sharePercent);
    }

    clear(): void {
        this.selectedSyndicateMemberIndex = null;
        if (this.syndicateMemberForm.valid) {
            this.newData.emit({ property: 'syndicateMembersNames', data: this.ELEMENT_DATA });
        }
        this.syndicateMemberForm.markAsPristine();
        this.syndicateMemberForm.markAsUntouched();
        this.syndicateMemberForm.updateValueAndValidity();
        this.syndicateMemberForm.reset();
    }

    edit(): void {
        const toEditSyndicateMember = this.ELEMENT_DATA[this.selectedSyndicateMemberIndex];
        toEditSyndicateMember.name = this.syndicateMemberForm.controls['name'].value;
        toEditSyndicateMember.sharePercent = this.syndicateMemberForm.controls['sharePercent'].value;

        this.dataSource = new MatTableDataSource<SyndicateMembersName>(this.ELEMENT_DATA);
        this.AlertService.onSuccess('با موفقیت ویرایش شد');
        this.clear();
    }

    delete(index): void {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<SyndicateMembersName>(this.ELEMENT_DATA);
            this.AlertService.onSuccess('با موفقیت حذف شد');
        } else {
            this.AlertService.onError('خطا در حذف');
        }
        this.clear();
    }

    add(): void {
        this.ELEMENT_DATA.push(this.syndicateMemberForm.value);
        this.dataSource = new MatTableDataSource<SyndicateMembersName>(this.ELEMENT_DATA);
        this.AlertService.onSuccess('با موفقیت ایجاد شد');
        this.clear();
    }

    ngOnInit(): void {}
}
