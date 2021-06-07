import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeSimpleSelectorComponent } from './tree-simple-selector.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
    declarations: [TreeSimpleSelectorComponent],
    exports: [
        TreeSimpleSelectorComponent
    ],
    imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatChipsModule, MatMenuModule, MatProgressSpinnerModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FlexModule]
})
export class TreeSimpleSelectorModule {}
