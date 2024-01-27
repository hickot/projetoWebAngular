import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordMatchValidation } from '../validations/password-match,validation';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {


  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {}


  //criando um objeto para que possamos
  //capturar o conteúdo do formulário
  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
    ]),
    senhaConfirmacao: new FormControl('', [
      Validators.required
    ])
  }, {
    validators: [PasswordMatchValidation.MatchPassword]
  });


  //função auxiliar para que possamos
  //exibir as mensagens de validação
  //conforme os erros do formulário
  get f(): any {
    return this.form.controls;
  }


  //criando a função para capturar
  //o evento SUBMIT do formulário
  onSubmit() : void {


    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //fazendo uma chamada /POST api/usuario/criar
    this.httpClient.post(environment.apiUsuarios + '/criar', this.form.value)
      .subscribe({ //capturando o retorno da API
        next: (data: any) => { //resposta de sucesso da API
          this.mensagemSucesso = `Parabéns ${data.nome}, seu cadastro foi realizado com sucesso.`;
          this.form.reset(); //limpar os campos do formulário
        },
        error: (e) => { //resposta de erro da API
          this.mensagemErro = e.error.errors[0];
          console.log(e.error);
        }
      })
  }


}
