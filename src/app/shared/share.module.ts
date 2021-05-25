import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { ChartsModule } from 'ng2-charts';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { IirmsSelectSearchComponent } from './components/confirm-dialog/iirms-select-search/iirms-select-search.component';
import { MailCardComponent } from './components/confirm-dialog/mail-card/mail-card.component';
import { MailListComponent } from './components/confirm-dialog/mail-list/mail-list.component';
import { OperatorListsComponent } from './components/operator-lists/operator-lists.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';
import { TableDialogComponent } from './components/table-dialog/table-dialog.component';
import { TableSaveCSVComponent } from './components/table/table-save-csv/table-save-csv.component';
import { TableSaveXLSComponent } from './components/table/table-save-xls/table-save-xls.component';
import { TableComponent } from './components/table/table.component';
import { TreeSelectComponent } from './components/tree-select/tree-select.component';
import { BadgeDirective } from './directives/badge.directive';
import { DialogHeaderDirective } from './directives/dialog-header.directive';
import { UsualButtonDirective } from './directives/usual-button.directive';
import { MaterialModule } from './material.module';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './material.persian-date.adapter';
import { PipesModule } from '#shared/pipes/pipes.module';
import { TableSavePdfComponent } from '#shared/components/table/table-save-pdf/table-save-pdf.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
    declarations: [
        MailCardComponent,
        MailListComponent,
        OperatorListsComponent,
        DialogHeaderDirective,
        BadgeDirective,
        UsualButtonDirective,
        ConfirmDialogComponent,
        IirmsSelectSearchComponent,
        PaginatorComponent,
        TableComponent,
        TableSaveCSVComponent,
        TableSaveXLSComponent,
        TableSavePdfComponent,
        TableDialogComponent,
        TreeSelectComponent,
        SearchSelectComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatTooltipModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatProgressSpinnerModule,
        NgxMatSelectSearchModule,
        ClipboardModule,
        ChartsModule,
        PipesModule,
        NgxPrintModule
    ],
    exports: [
        MailCardComponent,
        MailListComponent,
        OperatorListsComponent,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        DialogHeaderDirective,
        UsualButtonDirective,
        BadgeDirective,
        IirmsSelectSearchComponent,
        MatRippleModule,
        PaginatorComponent,
        TableComponent,
        TableDialogComponent,
        TreeSelectComponent,
        SearchSelectComponent,
        TreeSelectComponent,
        ClipboardModule,
        ChartsModule,
    ],
    entryComponents: [ConfirmDialogComponent],
    providers: [
        { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    ],
})
export class ShareModule {}
