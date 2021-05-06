import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioEstudianteComponent } from './componentes/formulario-estudiante/formulario-estudiante.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListarEstudianteComponent } from './componentes/listar-estudiante/listar-estudiante.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: 'editar/:idEstudiante', component: FormularioEstudianteComponent},
  { path: 'crear', component: FormularioEstudianteComponent},
  { path: 'listar', component: ListarEstudianteComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
