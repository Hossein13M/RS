import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [FuseConfirmDialogComponent],
    imports: [MatDialogModule, MatButtonModule, MatIconModule],
    entryComponents: [FuseConfirmDialogComponent],
})
export class FuseConfirmDialogModule {}
