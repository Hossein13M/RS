import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerticalLayout1Module } from 'app/layout/vertical/layout-1/layout-1.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [VerticalLayout1Module, CommonModule],
    exports: [VerticalLayout1Module, HeaderComponent],
    declarations: [HeaderComponent],
})
export class LayoutModule {}
