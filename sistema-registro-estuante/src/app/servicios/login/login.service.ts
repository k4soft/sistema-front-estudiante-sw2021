import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const END_POINT = 'http://localhost:8082/oauth/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: Usuario;

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    const credenciales = btoa('angular-app' + ':' + 'abcd*');
    const httpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + credenciales
      }
    );

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(END_POINT, params.toString(),{ headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void{
    const payload = this.getPayload(accessToken);
    this.usuario = new Usuario();
    this.usuario.username = payload.user_name;
    this.usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  guardarToken(accessToken: string){
    sessionStorage.setItem('token', accessToken);
  }

  getPayload(accessToken: string) : any{
     if(accessToken !== undefined){
       return JSON.parse(atob(accessToken.split('.')[1]));
     }
     return null;
  }
  logout(){
     this.usuario = null;
     sessionStorage.clear();
     sessionStorage.removeItem('usuario');
     sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean{
    return sessionStorage.getItem('usuario') != null;
  }

}
