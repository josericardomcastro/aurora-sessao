import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormularioPresencaComponent} from './formulario-presenca/formulario-presenca.component';
import {ConfirmacaoComponent} from './confirmacao/confirmacao.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: FormularioPresencaComponent
    },
    {
        path: 'confirmacao',
        component: ConfirmacaoComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}