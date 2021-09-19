import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShareModule } from '#shared/share.module';
import { HeaderModule } from '../../../layout/components/header/header.module';

@NgModule({
    declarations: [OrganizationComponent],
    imports: [CommonModule, ReactiveFormsModule, FlexModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ShareModule, HeaderModule],
    exports: [OrganizationComponent],
    entryComponents: [OrganizationComponent],
})
export class OrganizationModule {}
