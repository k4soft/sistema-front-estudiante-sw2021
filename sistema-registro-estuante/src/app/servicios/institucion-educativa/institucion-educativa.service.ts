import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametroConexion } from 'src/app/utilidades/parametro-conexion';
import { InstitucionEducativa } from '../../modelo/institucion-educativa';

@Injectable({
  providedIn: 'root'
})
export class InstitucionEducativaService {
  constructor(private http: HttpClient, private parametroConexion : ParametroConexion) { }

  listarInstitucionesEducativas(): Observable<InstitucionEducativa[]>{
    return this.http.get<InstitucionEducativa[]>(this.parametroConexion.getUrlBase().concat('/v1/instituciones-educativas') , { headers: this.parametroConexion.getSimpleHeader()});
  }
}
