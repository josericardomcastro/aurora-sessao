import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {FormularioPresencaComponent} from './formulario-presenca/formulario-presenca.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RestangularModule} from 'ngx-restangular';
import {SessaoService} from './_services/sessao.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask';
import {ConfirmacaoComponent} from './confirmacao/confirmacao.component';
import {environment} from '../environments/environment';

export function RestangularConfigFactory (RestangularProvider) {
    RestangularProvider.setBaseUrl(environment.api);
}

@NgModule({
    declarations: [
        AppComponent,
        FormularioPresencaComponent,
        ConfirmacaoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),
        RestangularModule.forRoot(RestangularConfigFactory)
    ],
    providers: [
        SessaoService
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
