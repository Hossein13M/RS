import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MessageApiService } from 'app/services/feature-services/message-api.service';
import { SendMailComponent } from '../send-mail/send-mail.component';

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.scss'],
    animations: [fuseAnimations],
})
export class MailComponent implements OnInit {
    inputCount;
    outputCount;
    inboxes;
    outboxes;
    searchInput = new FormControl();
    currentList = [];

    currentMail = null;

    activePageType = [
        { id: 0, title: 'ایمیل های ارسالی' },
        { id: 1, title: 'ایمیل های دریافتی' },
    ];

    //0 inbox
    //1 outbox
    currentMailTypeId;

    activePageTitle;

    userInfo;
    isWorking: any;

    constructor(
        private snackBar: MatSnackBar,
        private _fuseSidebarService: FuseSidebarService,
        private messageApiService: MessageApiService,
        public dialog: MatDialog
    ) {}

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    deleteMessage(event) {
        if (event.messageType === 0) {
            this.messageApiService.deleteInboxMessage(event.messageId, this).subscribe((res) => {
                this.snackBar.open('پیام با موفقیت حذف شد', '', {
                    panelClass: 'snack-success',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.getInbox();
            });
        } else if (event.messageType === 1) {
            this.messageApiService.deleteOutboxMessage(event.messageId, this).subscribe((res) => {
                this.snackBar.open('پیام با موفقیت حذف شد', '', {
                    panelClass: 'snack-success',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.getOutbox();
            });
        }
    }

    showMail(id) {
        this.messageApiService.getMessageById(id, this).subscribe((res) => (this.currentMail = res));
    }

    getInbox() {
        this.messageApiService.getAllInbox(this).subscribe((res: any) => {
            this.inboxes = res.items;
            this.inputCount = res.total;
            if (!this.currentList) {
                this.currentList = this.inboxes;
            } else {
                this.currentList = this.inboxes;
            }
            this.currentMail = null;
        });
    }

    showInbox() {
        this.currentList = this.inboxes;
        this.activePageTitle = this.activePageType[1].title;
        this.currentMail = null;
        this.currentMailTypeId = 0;
    }

    showOutbox() {
        this.currentList = this.outboxes;
        this.activePageTitle = this.activePageType[0].title;
        this.currentMail = null;
        this.currentMailTypeId = 1;
    }

    getOutbox() {
        this.messageApiService.getAllOutbox(this).subscribe((res: any) => {
            this.outboxes = res.items;
            this.outputCount = res.total;
            if (!this.currentList) {
                this.currentList = this.outboxes;
            } else {
                this.currentList = this.inboxes;
            }
            this.currentMail = null;
        });
    }

    updateMail(event) {
        if (event) {
            this.getInbox();
            this.getOutbox();
        }
    }

    openSendMailDialog() {
        const dialogRef = this.dialog.open(SendMailComponent, {
            panelClass: 'dialog-w50',
        });
        dialogRef.afterClosed().subscribe((r) => {
            if (r) {
                this.getInbox();
                this.getOutbox();
            }
        });
    }

    ngOnInit() {
        this.getInbox();
        this.getOutbox();
        this.activePageTitle = this.activePageType[1].title;
    }

    handleError(): boolean {
        return false;
    }
}
