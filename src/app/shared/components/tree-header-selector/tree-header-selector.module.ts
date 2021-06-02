import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeHeaderSelectorComponent } from './tree-header-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [TreeHeaderSelectorComponent],
    exports: [
        TreeHeaderSelectorComponent
    ],
    imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, RouterModule]
})
export class TreeHeaderSelectorModule {}
