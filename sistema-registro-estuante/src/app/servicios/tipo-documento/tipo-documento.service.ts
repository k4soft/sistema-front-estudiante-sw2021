import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../modelo/tipo-documento';
import { ParametroConexion } from '../../utilidades/parametro-conexion';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {



  constructor(private http: HttpClient, private parametroConexion : ParametroConexion) { }

  listarTipoDocumento(): Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(this.parametroConexion.getUrlBase().concat('/v1/tipo-documento'), { headers: this.parametroConexion.getSimpleHeader()});
  }
}
