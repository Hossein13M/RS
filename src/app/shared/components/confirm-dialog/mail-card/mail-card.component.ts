import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendMailComponent } from 'app/modules/mails/send-mail/send-mail.component';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

@Component({
    selector: 'app-mailcard',
    templateUrl: './mail-card.component.html',
    styleUrls: ['./mail-card.component.scss'],
})
export class MailCardComponent implements OnInit, OnChanges {
    @Input() inbox;
    @Input() mailType;
    @Output() deleteMsg = new EventEmitter<any>();
    @Output() updateInbox = new EventEmitter<any>();

    constructor(private dialog: MatDialog) {}

    deleteMail(id: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            panelClass: 'dialog-w40',
            data: {
                title: 'آیا از حذف این پیام اطمینان دارید؟',
            },
        });
        dialogRef.afterClosed().subscribe((r) => {
            if (r) {
                this.deleteMsg.emit({ messageType: this.mailType, messageId: id });
            }
        });
    }

    openSendMailDialog(data) {
        const dialogRef = this.dialog.open(SendMailComponent, {
            panelClass: 'dialog-w40',
            data: data,
        });
        dialogRef.afterClosed().subscribe((r) => {
            if (r) {
                this.updateInbox.emit(true);
            }
        });
    }

    reply() {
        let data = { toUsers: this.inbox.toUsers.map((x) => x.partyId) };
        this.openSendMailDialog(data);
    }

    forward() {
        let data = { title: this.inbox.title, body: this.inbox.body };
        this.openSendMailDialog(data);
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.inbox) {
            if (!changes.inbox.firstChange) {
                this.inbox = changes.inbox.currentValue;
            }
        }
        if (changes.mailType) {
            if (!changes.mailType.firstChange) {
                this.mailType = changes.mailType.currentValue;
            }
        }
    }
}
