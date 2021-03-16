import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { IssuerDto } from 'app/services/API/models';
import { IssuerGoalsService } from 'app/services/App/IssuerGoal/issuer-goal.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'issuer-goal',
    templateUrl: './issuer-goal.component.html',
    styleUrls: ['./issuer-goal.component.scss'],
    animations: fuseAnimations,
})
export class IssuerGoalComponent implements OnInit, AfterViewInit {
    issuerList: IssuerDto[] = [];
    ELEMENT_DATA: IssuerDto[] = [];
    searchInput: FormControl;
    public issuerName: FormControl;
    slectedIssuer = 0;
    dialogRef: any;
    loading = false;
    dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'operation'];

    constructor(private issuerGoalsService: IssuerGoalsService) {
        this.searchInput = new FormControl('');
        this.issuerName = new FormControl('');
    }

    ngOnInit(): void {
        this.issuerGoalsService.issuerGoalList.subscribe((res) => {
            this.issuerList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
        });

        this.issuerGoalsService.getIssuers(this.searchInput.value).subscribe(() => {});

        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.issuerGoalsService.getIssuers(searchText).subscribe(() => {});
        });
    }

    ngAfterViewInit(): void {
        document.getElementById('issuerGoal').addEventListener('scroll', this.scroll.bind(this), true);
    }

    scroll(): void {
        let table = document.getElementById('issuerGoal');
        var scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);

        if (!this.loading) {
            if (scrollPosition < 80) {
                if (this.issuerGoalsService.skip <= this.issuerGoalsService.total) {
                    this.loading = true;
                    this.issuerGoalsService.getIssuers(this.searchInput.value).subscribe(() => (this.loading = false));
                }
            }
        } else return;
    }

    addIssuer() {
        this.issuerGoalsService.addIssuer(this.issuerName.value).subscribe(() => {});
        this.issuerName.reset();
    }

    editIssuer(issuer) {
        this.slectedIssuer = issuer.id;
        this.issuerName.setValue(issuer.name);
    }

    clear() {
        this.slectedIssuer = 0;
        this.issuerName.setValue('');
    }

    edit() {
        this.issuerGoalsService.editIssuer(this.slectedIssuer, this.issuerName.value).subscribe(() => {});
    }

    remove(issuer) {
        this.issuerGoalsService.deleteIssuer(issuer.id).subscribe(() => {});
    }
}
