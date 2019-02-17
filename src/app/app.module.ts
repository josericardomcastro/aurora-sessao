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
import {AuthenticationService} from './_services/authentication.service';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';

export function RestangularConfigFactory (RestangularProvider) {
    RestangularProvider.setBaseUrl(environment.api);

    RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        // console.log('token',token);
        return {
            headers: Object.assign({}, headers, {Authorization: `Bearer ${token}`})
        };
    });
}

@NgModule({
    declarations: [
        AppComponent,
        ConfirmacaoComponent,
        LoginComponent
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
        SessaoService,
        AuthenticationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
