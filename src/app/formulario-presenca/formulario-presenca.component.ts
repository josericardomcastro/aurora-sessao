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
    mostrarConfirmacao: boolean = false;
    cpf = null;
    obreiro = null;
    imagemPerfil: string = null;

    sessaoAtiva: boolean = true;

    constructor(private router: Router,
                private sessaoService: SessaoService) { }

    ngOnInit() {
        this.getSessaoAtual();
    }

    ngAfterViewInit() {
        this.inputEl.nativeElement.focus();
    }

    getSessaoAtual() {
        this.loading = true;
        this.sessaoService.getSessaoAtual({})
            .subscribe(resultado => {
                this.loading = false;
                this.sessao = resultado;
                this.sessaoAtiva = ( this.sessao.hasOwnProperty('id_sessao') ) ? true : false;
            });
    }

    verificarObreiro(){
        this.loadingPost = true;
        this.sessaoService.getObreiro(this.cpf)
            .subscribe(resultado => {
                if (resultado.hasOwnProperty('id_pessoa')){
                    this.obreiro = resultado;
                    this.imagemPerfil = this.sessaoService.getPublicUrl()+"/photos/"+this.obreiro.id_pessoa+".jpg";
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
                    this.mostrarConfirmacao = true;
                    this.loading = false;
                    this.loadingPost = false;

                    let interval = setInterval(() => {
                        window.location.reload();
                    }, 5000);


                } else {
                    this.cpf = null;
                    this.error = 'Número de CPF não encontrado';
                    this.loadingPost = false;

                    let interval = setTimeout(() => {
                        this.error = null;
                    }, 2000);

                }
            }, (err) => {
                let retorno = JSON.parse(err._body);
                this.error = retorno.error;
                this.loadingPost = false;
            });
    }

}
