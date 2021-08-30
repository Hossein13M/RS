import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractBpmnComponent } from './contract-bpmn.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContractBpmnDialogComponent } from './contract-bpmn-dialog/contract-bpmn-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ShareModule } from '#shared/share.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractBpmnComponent }];

@NgModule({
    declarations: [ContractBpmnComponent, ContractBpmnDialogComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatDialogModule,
        FlexModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        ShareModule,
        DragDropModule,
        MatTooltipModule,
    ],
    exports: [ContractBpmnComponent],
})
export class ContractBpmnModule {}
