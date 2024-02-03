import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  //atributos / variáveis
  usuarioAutenticado: boolean = false;
  usuarioNome: string = '';
  usuarioEmail: string = '';

  //evento executado no momento
  //em que o componente for aberto
  ngOnInit(): void {

    //capturar os dados gravados na localstorage
    const auth = localStorage.getItem('auth');

    //verificar se existe um usuário autenticado
    if(auth != null) {

      //ler os dados capturados da local storage
      const usuario = JSON.parse(auth);
      this.usuarioAutenticado = true;
      this.usuarioNome = usuario.nome;
      this.usuarioEmail = usuario.email;
    }
  }

  //função para fazer o logout do usuário
  logout(): void {

    //verificar se o usuário deseja realmente sair do sistema
    if(confirm('Deseja realmente sair do sistema?')) {

      //apagar os dados gravados na local storage
      localStorage.removeItem('auth');

      //redirecionar de volta para a página de login
      location.href = '/app/login';
    }
  }
}
