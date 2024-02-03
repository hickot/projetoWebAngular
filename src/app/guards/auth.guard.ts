import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({

    providedIn: 'root'
})
export class AuthGuard {

    constructor(private router: Router) {}

    canActivate(): boolean {

        //verificando se o usuário está autenticado
        if(localStorage.getItem('auth') != null) {

            return true;
        }
        else {

            this.router.navigate(['/app/login']);

            return false;
        }
    }
}
