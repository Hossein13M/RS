import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { IssuerDto } from 'app/services/API/models';
import { IssuerLicenceService } from 'app/services/App/IssuerLicence/issuer-licence.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'issuer-license',
    templateUrl: './issuer-license.component.html',
    styleUrls: ['./issuer-license.component.scss'],
    animations: fuseAnimations,
})
export class IssuerLicenseComponent implements OnInit, AfterViewInit {
    issuerList: IssuerDto[] = [];
    ELEMENT_DATA: IssuerDto[] = [];

    searchInput: FormControl;
    public issuerName: FormControl;
    slectedIssuer = 0;

    dialogRef: any;
    loading = false;
    dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'operation'];

    constructor(private issuerLicenceService: IssuerLicenceService) {
        this.searchInput = new FormControl('');
        this.issuerName = new FormControl('');
    }

    ngOnInit(): void {
        this.issuerLicenceService.issuerLicenseList.subscribe((res) => {
            this.issuerList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
        });

        this.issuerLicenceService.getIssuers(this.searchInput.value).subscribe(() => {});

        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.issuerLicenceService.getIssuers(searchText).subscribe(() => {});
        });
    }

    ngAfterViewInit(): void {
        document.getElementById('issuerLicence').addEventListener('scroll', this.scroll.bind(this), true);
    }

    scroll(): void {
        const table = document.getElementById('issuerLicence');
        const scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);

        if (!this.loading) {
            if (scrollPosition < 80) {
                if (this.issuerLicenceService.skip <= this.issuerLicenceService.total) {
                    this.loading = true;
                    this.issuerLicenceService.getIssuers(this.searchInput.value).subscribe(() => {
                        this.loading = false;
                    });
                }
            }
        } else {
            return;
        }
    }

    addIssuer(): void {
        this.issuerLicenceService.addIssuer(this.issuerName.value).subscribe(() => {});
        this.issuerName.reset();
    }

    editIssuer(issuer): void {
        this.slectedIssuer = issuer.id;
        this.issuerName.setValue(issuer.name);
    }

    clear(): void {
        this.slectedIssuer = 0;
        this.issuerName.setValue('');
    }

    edit(): void {
        this.issuerLicenceService.editIssuer(this.slectedIssuer, this.issuerName.value).subscribe((res) => {});
    }

    remove(issuer): void {
        this.issuerLicenceService.deleteIssuer(issuer.id).subscribe(() => {});
    }
}
