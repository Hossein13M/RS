import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoleMappingDialogComponent } from './organization-role-mapping-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [OrganizationRoleMappingDialogComponent],
    imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule, MatChipsModule, MatTreeModule, MatDividerModule],
    entryComponents: [OrganizationRoleMappingDialogComponent],
})
export class OrganizationRoleMappingDialogModule {}
