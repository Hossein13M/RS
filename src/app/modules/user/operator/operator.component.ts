import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { ResponseOperatorItemDto } from 'app/services/API/models';
import { OperatorManagmentService } from 'app/services/App/user/operator-managment.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddOperatorComponent } from './add-operator/add-operator.component';

@Component({
    selector: 'app-operator',
    templateUrl: './operator.component.html',
    styleUrls: ['./operator.component.scss'],
    animations: fuseAnimations,
})
export class OperatorComponent implements OnInit, AfterViewInit {
    operators: ResponseOperatorItemDto[] = [];
    ELEMENT_DATA: ResponseOperatorItemDto[] = [];
    searchInput: FormControl;
    dialogRef: any;
    loading = false;
    dataSource = new MatTableDataSource<ResponseOperatorItemDto>(this.ELEMENT_DATA);
    displayedColumns = ['firstName', 'lastName', 'email', 'mobileNumber', 'userName', 'status', 'edit'];

    constructor(private operatorService: OperatorManagmentService, private _matDialog: MatDialog) {
        this.searchInput = new FormControl('');
    }

    ngOnInit(): void {
        this.operatorService.operators.subscribe((res) => {
            this.operators = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<ResponseOperatorItemDto>(this.ELEMENT_DATA);
        });

        this.operatorService.getOperators(this.searchInput.value).subscribe(() => {
            //loading
        });

        this.searchInput.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((searchText) => this.operatorService.getOperators(searchText).subscribe((i) => {}));
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
                this.operatorService.getOperators(this.searchInput.value).subscribe(() => (this.loading = false));
            }
        } else return;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New operator
     */
    newOperator(): void {
        this.dialogRef = this._matDialog.open(AddOperatorComponent, { data: { action: 'new' } });

        // this.dialogRef.afterClosed().subscribe((response) => {});
    }

    /**
     * Edit operator
     *
     * @param operator
     */
    editOperator(operator): void {
        this.dialogRef = this._matDialog.open(AddOperatorComponent, { data: { operator: operator, action: 'edit' } });

        // this.dialogRef.afterClosed().subscribe(response => {});
    }

    delete(partyID): void {
        // this.operatorService.(partyID).subscribe(res => {
        //     // loading
        // })
    }
}
