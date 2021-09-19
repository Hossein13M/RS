import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ConfirmationDialogComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
    entryComponents: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
