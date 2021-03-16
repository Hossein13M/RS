import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
    @Input() data: PagingEvent;
    @Output() page: EventEmitter<PagingEvent> = new EventEmitter<PagingEvent>();
    @Input() pageSizeOptions: number[];
    searchTerm$ = new Subject<number>();
    @Input() pageText = true;

    constructor() {
        this.changePage();
    }

    ngOnInit(): void {}

    next(): void {
        if (this.data.currentIndex < this.data.length / this.data.pageSize - 1) {
            this.data.currentIndex++;
            this.page.emit(this.data);
        }
    }

    prev(): void {
        if (this.data.currentIndex > 0) {
            this.data.currentIndex--;
            this.page.emit(this.data);
        }
    }

    endListNumber(): number {
        const num = this.data.currentIndex * this.data.pageSize + this.data.pageSize;
        if (num > this.data.length) {
            return this.data.length;
        }
        return num;
    }

    changeNumber(e: MatSelectChange): void {
        this.data.pageSize = e.value;
        this.data.currentIndex = 0;
        this.page.emit(this.data);
    }

    getLast(): boolean {
        if (this.data.length % this.data.pageSize === 0) {
            return this.data.currentIndex === Math.floor(this.data.length / this.data.pageSize) - 1;
        } else {
            return this.data.currentIndex === Math.floor(this.data.length / this.data.pageSize);
        }
    }

    lastPage(): void {
        const divide = this.data.length / this.data.pageSize;
        const remain = this.data.length % this.data.pageSize;
        if (remain !== 0) {
            this.data.currentIndex = Math.floor(divide);
        } else {
            this.data.currentIndex = Math.floor(divide) - 1;
        }
        this.page.emit(this.data);
    }

    firstPage(): void {
        this.data.currentIndex = 0;
        this.page.emit(this.data);
    }

    getLastPage(): number {
        const remain = this.data.length % this.data.pageSize;
        if (remain === 0) {
            return Math.floor(this.data.length / this.data.pageSize);
        } else {
            return Math.floor(this.data.length / this.data.pageSize) + 1;
        }
    }

    getPageNumber(): number {
        return Math.floor((this.data.currentIndex * this.data.pageSize + 1) / this.data.pageSize) + 1;
    }

    changePage(): void {
        this.changePageListener(this.searchTerm$).subscribe((inputValue) => {
            if (inputValue < 1) {
                this.firstPage();
                return;
            }
            if (inputValue > this.getLastPage()) {
                this.lastPage();
                return;
            }
            this.data.currentIndex = inputValue - 1;
            this.page.emit(this.data);
        });
    }

    changePageListener(term: Observable<number>): Observable<any> {
        return term
            .pipe(debounceTime(1000))
            .pipe(distinctUntilChanged())
            .pipe(switchMap((value) => this.pageChangeSubscriber(value)));
    }

    pageChangeSubscriber(value: number): Observable<number> {
        return new Observable<number>((o) => o.next(value));
    }

    ngOnChanges(): void {}
}

export interface PagingEvent {
    currentIndex: number;
    length: number;
    pageSize: number;
}
