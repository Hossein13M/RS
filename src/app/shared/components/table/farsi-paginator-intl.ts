import { MatPaginatorIntl } from '@angular/material/paginator';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
        return `0 van ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} از ${length}`;
};

export function getFarsiPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'سطر در هر صفحه :';
    paginatorIntl.nextPageLabel = 'صفحه‌ی بعد';
    paginatorIntl.previousPageLabel = 'صفحه‌ی قبل';
    paginatorIntl.lastPageLabel = 'صفحه‌ی آخر';
    paginatorIntl.firstPageLabel = 'صفحه‌ی اول';
    paginatorIntl.getRangeLabel = dutchRangeLabel;

    return paginatorIntl;
}
