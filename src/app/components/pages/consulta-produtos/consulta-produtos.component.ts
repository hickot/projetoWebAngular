import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent implements OnInit {

  //atributos
  produtos: any[] = [];

  //construtor
  constructor(
    private httpClient: HttpClient
  ){}

  //função executada no momento em que a página é aberta
  ngOnInit(): void {

    //capturar os dados do usuário autenticado na local storage
    const usuario = JSON.parse(localStorage.getItem('auth') as string);

    //configurando o token JWT
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + usuario.accessToken

    });

    //fazendo a chamada para consultar os produtos na API
    this.httpClient.get('http://localhost:8081/api/produtos', { headers: httpHeaders })
      .subscribe({
        next: (data) => {
          //armanzendo a lista de produtos obtidos
          this.produtos = data as any[];
          console.log(data);
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }
}
