import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const END_POINT = 'http://localhost:8082/oauth/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

}
