import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user/user.component';
import { UserBatchComponent } from './user/user-batch/user-batch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { UserService } from './user.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { ShareModule } from '#shared/share.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: UserComponent }];

@NgModule({
    declarations: [UserComponent, UserBatchComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        LayoutModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        ShareModule
    ],
    exports: [RouterModule, UserComponent],
    providers: [UserService],
    entryComponents: [UserBatchComponent],
})
export class UserModule {}
