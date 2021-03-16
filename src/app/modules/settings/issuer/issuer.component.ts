import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { IssuerDto } from 'app/services/API/models';
import { IssuersService } from 'app/services/App/Issuer/issuer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'issuer',
    templateUrl: './issuer.component.html',
    styleUrls: ['./issuer.component.scss'],
    animations: fuseAnimations,
    providers: [IssuersService],
})
export class IssuerComponent implements OnInit, AfterViewInit {
    issuerList: IssuerDto[] = [];
    ELEMENT_DATA: IssuerDto[] = [];
    searchInput: FormControl;
    public issuerName: FormControl;
    slectedIssuer = 0;
    dialogRef: any;
    loading = false;
    dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'operation'];

    constructor(private issuerService: IssuersService, private _matDialog: MatDialog) {
        this.searchInput = new FormControl('');
        this.issuerName = new FormControl('');
    }

    ngOnInit(): void {
        this.issuerService.issuerList.subscribe((res) => {
            this.issuerList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
        });

        this.issuerService.getIssuers(this.searchInput.value).subscribe(() => {});

        this.searchInput.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((searchText) => this.issuerService.getIssuers(searchText).subscribe(() => {}));
    }

    ngAfterViewInit(): void {
        document.getElementById('issuer').addEventListener('scroll', this.scroll.bind(this), true);
    }

    scroll(): void {
        const table = document.getElementById('issuer');
        const scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);

        if (!this.loading) {
            if (scrollPosition < 80) {
                if (this.issuerService.skip <= this.issuerService.total) {
                    this.loading = true;
                    this.issuerService.getIssuers(this.searchInput.value).subscribe(() => (this.loading = false));
                }
            }
        } else return;
    }

    addIssuer(): void {
        this.issuerService.addIssuer(this.issuerName.value).subscribe(() => {});
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
        this.issuerService.editIssuer(this.slectedIssuer, this.issuerName.value).subscribe(() => {});
    }

    remove(issuer): void {
        this.issuerService.deleteIssuer(issuer.id).subscribe(() => {});
    }
}
