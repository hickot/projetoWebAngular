import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
    this.httpClient.get('http://localhost:8081/api/produtos')
      .subscribe({
        next: (data) => {

          //armanzendo a lista de produtos obtidos
          this.produtos = data as any[];
        },
        error: (e) => {

          console.log(e.error);
        }
      })
  }
}
