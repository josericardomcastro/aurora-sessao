import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormularioPresencaComponent} from './formulario-presenca/formulario-presenca.component';
import {ConfirmacaoComponent} from './confirmacao/confirmacao.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';

const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: './formulario-presenca/formulario-presenca.module#FormularioPresencaModule',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'confirmacao',
        canActivate: [AuthGuard],
        component: ConfirmacaoComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}