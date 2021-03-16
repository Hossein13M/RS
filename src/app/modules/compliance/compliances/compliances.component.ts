import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { ComplianceDto } from 'app/services/API/models';
import { CompliancesService } from 'app/services/App/compliance/compliances/compliances.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComplianceFundComponent } from '../compliance-fund/compliance-fund.component';

@Component({
    selector: 'app-conmpliances',
    templateUrl: './compliances.component.html',
    styleUrls: ['./compliances.component.scss'],
    animations: fuseAnimations,
})
export class CompliancesComponent implements OnInit, AfterViewInit {
    public compliances: ComplianceDto[] = [];
    public ELEMENT_DATA: ComplianceDto[] = [];
    public searchInput: FormControl;
    public complianceForm: FormGroup;
    private dialogRef: any;
    public slectedCompliance = 0;
    public loading = false;
    public dataSource = new MatTableDataSource<ComplianceDto>(this.ELEMENT_DATA);
    public displayedColumns = ['code', 'title', 'edit', 'addFund'];

    constructor(private compliancesService: CompliancesService, private _matDialog: MatDialog) {
        this.searchInput = new FormControl('');
        this.complianceForm = new FormGroup({
            code: new FormControl(),
            title: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.compliancesService.compliances.subscribe((res) => {
            this.compliances = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<ComplianceDto>(this.ELEMENT_DATA);
        });

        this.compliancesService.getComoliances(this.searchInput.value).subscribe((res) => {});

        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.compliancesService.getComoliances(searchText).subscribe((res) => {});
        });
    }

    ngAfterViewInit(): void {
        document.getElementById('table-container').addEventListener('scroll', this.scroll.bind(this), true);
        // document.addEventListener('scroll', this.scroll, true); //third parameter
    }

    scroll(event): void {
        const table = document.getElementById('table-container');
        const scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);

        if (!this.loading) {
            if (scrollPosition < 50) {
                this.loading = true;
                this.compliancesService.getComoliances(this.searchInput.value).subscribe((r) => {
                    this.loading = false;
                });
            }
        } else {
            return;
        }
    }

    addComplianceFund(compliance): void {
        this.dialogRef = this._matDialog.open(ComplianceFundComponent, {
            panelClass: 'compliance-form-dialog',
            data: {
                compliance: compliance,
            },
        });
    }

    addCompliance(): void {
        this.compliancesService
            .addCompliance(this.complianceForm.controls['title'].value, this.complianceForm.controls['code'].value)
            .subscribe((res) => {});
    }

    editCompliance(compliance): void {
        this.slectedCompliance = compliance.id;
        this.complianceForm.controls['title'].setValue(compliance.title);
        this.complianceForm.controls['code'].setValue(compliance.code);
    }

    clear(): void {
        this.slectedCompliance = 0;
        this.complianceForm.controls['title'].setValue('');
        this.complianceForm.controls['code'].setValue(null);
    }

    edit(): void {
        this.compliancesService
            .editCompliance(this.slectedCompliance, this.complianceForm.controls['title'].value, this.complianceForm.controls['code'].value)
            .subscribe((res) => {});
    }
}
