import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estudiante } from '../../modelo/estudiante';
import { EstudianteService } from '../../servicios/estudiantes/estudiante.service';

@Component({
  selector: 'app-listar-estudiante',
  templateUrl: './listar-estudiante.component.html',
  styleUrls: ['./listar-estudiante.component.css']
})
export class ListarEstudianteComponent implements OnInit {

listadoEstudiantes: Estudiante[] = [];

  constructor(private estudianteservice: EstudianteService, private router: Router) { }

  ngOnInit(): void {

    this.estudianteservice.listarEstudiantes().subscribe(
      resp => {
         this.listadoEstudiantes = resp;
         if(this.listadoEstudiantes.length === 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existe información en el sistema!',
            footer: ''
          });
         }
      }
    );

  }

  editarEstudiante(estudiante: Estudiante): void{
     this.router.navigate([`/editar/${estudiante.idEstudiante}`]);
  }

}
