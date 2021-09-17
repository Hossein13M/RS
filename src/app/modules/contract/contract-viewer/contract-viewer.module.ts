import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractViewerComponent } from './contract-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { AgFormViewerModule } from 'ag-form-builder';
import { LayoutModule } from '../../../layout/layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContractViewerService } from './contract-viewer.service';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractViewerComponent }];

@NgModule({
    declarations: [ContractViewerComponent],
    imports: [CommonModule, RouterModule.forChild(routes), AgFormViewerModule, LayoutModule, MatButtonModule, MatIconModule],
    exports: [ContractViewerComponent],
    providers: [ContractViewerService],
})
export class ContractViewerModule {}
