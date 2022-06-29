import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MailListItemComponent } from './mail-list-item/mail-list-item.component';
import { MailComponent } from './mail/mail.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { PipesModule } from '#shared/pipes/pipes.module';

const routes: Routes = [
    {
        path: 'mail',
        component: MailComponent,
    },
    {
        path: 'send-mail',
        component: SendMailComponent,
    },
];

@NgModule({
    declarations: [SendMailComponent, MailComponent, MailListItemComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ShareModule,
        FuseDirectivesModule,
        MatRippleModule,
        NgxMatSelectSearchModule,
        PipesModule,
    ],
    exports: [SendMailComponent],
    entryComponents: [SendMailComponent],
})
export class MessagingModule {}
