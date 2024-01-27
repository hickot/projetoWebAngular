import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //variáveis
  mensagem: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {}

  //estrutura do formulário
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
    ])
  });

  //variável para verificar o preenchimento dos campos
  //do formulário e exibir mensagens de erro de validação
  get f(): any {
    return this.form.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {
    this.httpClient.post(environment.apiUsuarios + "/autenticar", this.form.value).subscribe({
      next: (data: any) => {
        //gravar os dados obtidos na local storage
        localStorage.setItem('auth', JSON.stringify(data));

        //redirecionar
        location.href='/app/consulta-produtos';
      },
      error: (e) => {
        this.mensagem = e.error.errors[0];
      }
    })
  }

}
