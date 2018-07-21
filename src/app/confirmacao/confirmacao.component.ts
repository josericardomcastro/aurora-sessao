import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SessaoService} from '../_services/sessao.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        let interval = setInterval(() => {
            this.router.navigate(['/']);
        }, 3000);
    }





}
