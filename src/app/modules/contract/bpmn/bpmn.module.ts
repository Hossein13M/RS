import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpmnComponent } from './bpmn.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [{ path: '', pathMatch: 'full', component: BpmnComponent }];

@NgModule({
    declarations: [BpmnComponent],
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
    exports: [BpmnComponent],
})
export class BpmnModule {}
