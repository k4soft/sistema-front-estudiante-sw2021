import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../../modelo/estudiante';
import { ParametroConexion } from '../../utilidades/parametro-conexion';
import { ComandoEstudiante } from '../../comando/comando-estudiante';



@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  endPoint = this.parametroConexion.getUrlBase().concat('/v1/estudiante');

  constructor(private http: HttpClient,private parametroConexion: ParametroConexion) { }

  listarEstudiantes(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(this.endPoint);
  }

  insertar(comandoEstudiante: ComandoEstudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.endPoint, comandoEstudiante , { headers: this.parametroConexion.getJsonHeader()});
  }

  editar(comandoEstudiante: ComandoEstudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.endPoint}/${comandoEstudiante.idEstudiante}`,
    comandoEstudiante , { headers: this.parametroConexion.getJsonHeader()});
  }

  consultarPorId(idEstudiante: number): Observable<Estudiante>{
    return this.http.get<Estudiante>(`${this.endPoint}/${idEstudiante}`);
  }

}
