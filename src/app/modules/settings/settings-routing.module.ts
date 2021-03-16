import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BourceInstrumentDetailComponent } from './bource-instrument-detail/bource-instrument-detail.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
    {
        path: 'input',
        component: InputComponent,
    },
    {
        path: 'bourse',
        component: BourceInstrumentDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
