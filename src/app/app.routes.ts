import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { CriarUsuarioComponent } from './components/pages/criar-usuario/criar-usuario.component';

export const routes: Routes = [
  {
    path: "app/login", /* rota da página de login */
    component: LoginComponent
  },
  {
    path: "app/criar-usuario", /* rota da página de criar usuário */
    component: CriarUsuarioComponent
  },
  {
    path: "", /* rota raiz do projeto (default) */
    pathMatch: "full",
    redirectTo: "/app/login"
  }
];
