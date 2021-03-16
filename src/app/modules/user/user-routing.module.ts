import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { OperatorComponent } from './operator/operator.component';

const routes: Routes = [
    {
        path: 'operator',
        component: OperatorComponent,
    },
    {
        path: 'customer',
        component: CustomerComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'operator',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
