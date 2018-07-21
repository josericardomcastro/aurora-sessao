import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SessaoService} from '../_services/sessao.service';

@Component({
  selector: 'app-login',
  templateUrl: './formulario-presenca.component.html',
  styleUrls: ['./formulario-presenca.component.css']
})
export class FormularioPresencaComponent implements OnInit {

    @ViewChild("inputcpf") inputEl: ElementRef;

    sessao: any = null;
    loading = false;
    loadingPost = false;
    error = null;
    success = null;
    cpf = null;
    obreiro = null;

    constructor(private router: Router,
                private sessaoService: SessaoService) { }

    ngOnInit() {
        this.getSessaoAtual();
    }

    ngAfterViewInit() {
        this.inputEl.nativeElement.focus();
        console.log(this.inputEl);
    }

    getSessaoAtual() {
        this.loading = true;
        this.sessaoService.getSessaoAtual({})
            .subscribe(resultado => {
                this.sessao = resultado;
                this.loading = false;
            });
    }

    verificarObreiro(){
        this.sessaoService.getObreiro(this.cpf)
            .subscribe(resultado => {
                if (resultado.hasOwnProperty('id_pessoa')){
                    this.obreiro = resultado;
                    this.registrarPresenca(this.sessao.id_sessao, this.obreiro)
                }else {
                    this.error = "CPF não encontrado!";
                    this.cpf = null;
                }
            });
    }

    registrarPresenca(id_sessao, obreiro) {
        this.loadingPost = true;

        this.sessaoService.registrarPresenca (id_sessao, obreiro)
            .subscribe(result => {
                if (result) {
                    this.router.navigate(['/confirmacao']);
                } else {
                    // login failed
                    this.error = 'Usuário e/ou senha incorreta(s)';
                    this.loadingPost = false;
                }
            }, (err) => {
                let retorno = JSON.parse(err._body);
                this.error = retorno.error;
                this.loadingPost = false;
            });
    }





}
