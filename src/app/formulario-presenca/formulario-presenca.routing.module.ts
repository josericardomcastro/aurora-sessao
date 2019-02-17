import {Component, ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormularioPresencaComponent} from './formulario-presenca.component';
import {AuthGuard} from '../_guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: FormularioPresencaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormularioPresencaRoutingModule {
}
