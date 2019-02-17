import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private router: Router, private authenticationService: AuthenticationService) {

        let validar = this.authenticationService.validar()
            .subscribe( result => {
                //this.router.navigate(['']);
            }, (err) => {
                //this.router.navigate(['login']);
            });


    }

}
