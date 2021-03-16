import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AumComponent } from './aum.component';

const routes: Routes = [{ path: '**', component: AumComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AUMRoutingModule {}
