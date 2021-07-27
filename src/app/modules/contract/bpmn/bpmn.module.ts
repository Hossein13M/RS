import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpmnComponent } from './bpmn.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', pathMatch: 'full', component: BpmnComponent }];

@NgModule({
    declarations: [BpmnComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [BpmnComponent],
})
export class BpmnModule {}
