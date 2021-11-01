import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoleMappingDialogComponent } from './organization-role-mapping-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderModule } from '../../../layout/components/header/header.module';

@NgModule({
    declarations: [OrganizationRoleMappingDialogComponent],
    imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule, MatChipsModule, MatTreeModule, MatDividerModule, MatTooltipModule, HeaderModule],
    entryComponents: [OrganizationRoleMappingDialogComponent],
})
export class OrganizationRoleMappingDialogModule {}
