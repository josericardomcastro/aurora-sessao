import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import {Restangular} from 'ngx-restangular';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class SessaoService {

    protected servico: any;
    private api = environment.api;
    private publicurl = environment.publicUrl;

    constructor(
        private http: Http,
        private  httpClient:  HttpClient,
        private restangular: Restangular) {
        this.servico = restangular.all('sessao');
    }

    getSessaoAtual(params): Observable<any> {
        return this.servico.customGET('atual', params);
    }

    getParticipantes(cpf): Observable<any> {
        return this.servico.customGET(cpf+'/participantes');
    }

    getObreiro(cpf): Observable<any> {
        return this.servico.customGET(cpf+'/obreiro');
    }

    registrarPresenca(id_sessao: number, obreiro: any) {
        return this.httpClient.post(`${this.api}/sessao/${id_sessao}/registrar-presenca`,obreiro);
    }

    getPublicUrl()
    {
        return this.publicurl;
    }



    private handleErrorObservable (error: Response | any)
    {
        // console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
