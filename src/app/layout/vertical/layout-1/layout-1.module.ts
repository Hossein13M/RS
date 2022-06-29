import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';
import { VerticalLayout1Component } from 'app/layout/vertical/layout-1/layout-1.component';

@NgModule({
    declarations: [VerticalLayout1Component],
    imports: [RouterModule, FuseSharedModule, FuseSidebarModule, FooterModule, NavbarModule, ToolbarModule],
    exports: [VerticalLayout1Component],
})
export class VerticalLayout1Module {}
