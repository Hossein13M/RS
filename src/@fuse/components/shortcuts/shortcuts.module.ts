import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';

import { FuseShortcutsComponent } from './shortcuts.component';
import { AlarmingMenuComponent } from './alarming-menu/alarming-menu.component';
import { ChangePriceComponent } from './change-price/change-price.component';
import { ChangePriceDialogComponent } from './change-price/change-price-dialog/change-price-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FuseShortcutsComponent, AlarmingMenuComponent, ChangePriceComponent, ChangePriceDialogComponent],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    exports: [FuseShortcutsComponent],
    providers: [CookieService],
})
export class FuseShortcutsModule {}
