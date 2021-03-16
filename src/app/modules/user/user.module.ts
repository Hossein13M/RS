import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from 'app/shared/share.module';
import { LayoutModule } from '../../layout/layout.module';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { AddOperatorComponent } from './operator/add-operator/add-operator.component';
import { OperatorComponent } from './operator/operator.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [OperatorComponent, CustomerComponent, UserManagmentComponent, AddOperatorComponent, AddCustomerComponent],
    imports: [CommonModule, UserRoutingModule, ShareModule, LayoutModule],
    exports: [ShareModule],
    entryComponents: [AddOperatorComponent, AddCustomerComponent],
})
export class UserModule {}
