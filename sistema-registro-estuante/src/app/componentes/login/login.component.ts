import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { LoginService } from '../../servicios/login/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }


  login() {
    if (this.usuario.username === undefined || this.usuario.password === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe ingresar las credenciales correctamente',
        footer: ''
      });
    }else {
       this.loginService.login(this.usuario).subscribe(
         resp =>{
              console.log(resp);
              this.loginService.guardarUsuario(resp.access_token);
              this.loginService.guardarToken(resp.access_token);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenid@',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/home']);
         }, _ =>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las credenciales no son válidas',
            footer: ''
          });
         }
       );
    }

  }

}
