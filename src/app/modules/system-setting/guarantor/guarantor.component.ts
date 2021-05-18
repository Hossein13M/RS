import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { GuarantorDtoWithId } from 'app/services/API/models';
import { GuarantorsService } from 'app/services/App/Guarantor/guarantor.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'guarantor',
    templateUrl: './guarantor.component.html',
    styleUrls: ['./guarantor.component.scss'],
    animations: fuseAnimations,
})
export class GuarantorComponent implements OnInit, AfterViewInit {
    guarantorList: GuarantorDtoWithId[] = [];
    ELEMENT_DATA: GuarantorDtoWithId[] = [];
    searchInput: FormControl;
    public guarantorForm: FormGroup;
    slectedIssuer = 0;
    dialogRef: any;
    loading = false;
    dataSource = new MatTableDataSource<GuarantorDtoWithId>(this.ELEMENT_DATA);
    displayedColumns = ['guarantor', 'type', 'otc', 'operation'];

    constructor(private guarantorService: GuarantorsService) {
        this.searchInput = new FormControl('');
        this.guarantorForm = new FormGroup({ guarantor: new FormControl(''), type: new FormControl(), otc: new FormControl() });
    }

    ngOnInit(): void {
        this.guarantorService.guarantorList.subscribe((res) => {
            this.guarantorList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<GuarantorDtoWithId>(this.ELEMENT_DATA);
        });

        this.guarantorService.getGuarantor(this.searchInput.value).subscribe(() => {});

        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.guarantorService.getGuarantor(searchText).subscribe(() => {});
        });
    }

    ngAfterViewInit(): void {
        document.getElementById('guarantor').addEventListener('scroll', this.scroll.bind(this), true);
    }

    scroll(): void {
        const table = document.getElementById('guarantor');
        const scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);

        if (!this.loading) {
            if (scrollPosition < 80) {
                if (this.guarantorService.skip <= this.guarantorService.total) {
                    this.loading = true;
                    this.guarantorService.getGuarantor(this.searchInput.value).subscribe(() => (this.loading = false));
                }
            }
        } else return;
    }

    addIssuer(): void {
        this.guarantorService
            .addGuarantor(
                this.guarantorForm.controls['guarantor'].value,
                this.guarantorForm.controls['type'].value,
                this.guarantorForm.controls['otc'].value
            )
            .subscribe(() => {});
        this.guarantorForm.reset();
    }

    editIssuer(guarantor): void {
        this.slectedIssuer = guarantor.id;
        this.guarantorForm.controls['guarantor'].setValue(guarantor.guarantor);
        this.guarantorForm.controls['type'].setValue(guarantor.type);
        this.guarantorForm.controls['otc'].setValue(guarantor.otc);
    }

    clear(): void {
        this.slectedIssuer = 0;
        this.guarantorForm.controls['guarantor'].setValue('');
        this.guarantorForm.controls['type'].setValue(null);
        this.guarantorForm.controls['otc'].setValue(null);
    }

    edit(): void {
        this.guarantorService
            .editGuarantor(
                this.slectedIssuer,
                this.guarantorForm.controls['guarantor'].value,
                this.guarantorForm.controls['type'].value,
                this.guarantorForm.controls['otc'].value
            )
            .subscribe(() => {});
    }

    remove(guarantor): void {
        this.guarantorService.deleteGuarantor(guarantor.id).subscribe(() => {});
    }
}
