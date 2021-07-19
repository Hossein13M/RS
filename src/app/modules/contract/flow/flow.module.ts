import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlowComponent } from './flow.component';
import { FlowDialogComponent } from './flow-dialog/flow-dialog.component';
import { FlowService } from './flow.service';
import { LayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShareModule } from '#shared/share.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: FlowComponent }];

@NgModule({
    declarations: [FlowComponent, FlowDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MatIconModule, MatButtonModule, ShareModule],
    entryComponents: [FlowDialogComponent],
    providers: [FlowService],
})
export class FlowModule {}
