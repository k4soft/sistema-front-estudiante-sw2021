import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TipoDocumento } from 'src/app/modelo/tipo-documento';
import { TipoDocumentoService } from '../../servicios/tipo-documento/tipo-documento.service';
import { InstitucionEducativa } from '../../modelo/institucion-educativa';
import { InstitucionEducativaService } from '../../servicios/institucion-educativa/institucion-educativa.service';
import { Estudiante } from '../../modelo/estudiante';
import Swal from 'sweetalert2';
import { ComandoEstudiante } from '../../comando/comando-estudiante';
import { EstudianteService } from '../../servicios/estudiantes/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-estudiante',
  templateUrl: './formulario-estudiante.component.html',
  styleUrls: ['./formulario-estudiante.component.css']
})
export class FormularioEstudianteComponent implements AfterContentInit {

  listaTipoDocumentos: TipoDocumento[];
  listaInstitucionesEducativas: InstitucionEducativa[];
  estudiante = new Estudiante();
  comandoEstudiante: ComandoEstudiante;
  idEstudiante: number;
  titulo: string;

  constructor(private tipoDocumentoService: TipoDocumentoService,
              private institucionEducativaService: InstitucionEducativaService,
              private estudianService: EstudianteService,
              private router: Router,
              private route: ActivatedRoute) { 
                 this.idEstudiante = +this.route.snapshot.paramMap.get('idEstudiante');
                 if ( this.idEstudiante === 0){
                      this.titulo = 'Registrar Estudiante!';
                 } else {
                      this.titulo = 'Editar Estudiante!';
                      this.consultarEstudiantePorId();
                 }
              }
  ngAfterContentInit(): void {
    this.tipoDocumentoService.listarTipoDocumento().subscribe(
      resp => {
        this.listaTipoDocumentos = resp;
      }
    );

    this.institucionEducativaService.listarInstitucionesEducativas().subscribe(
      resp => {
        this.listaInstitucionesEducativas = resp;
      }
    );
  }



  consultarEstudiantePorId(): void{
    this.estudianService.consultarPorId(this.idEstudiante).subscribe(
        resp => {
          this.estudiante = resp;
        }
    );
  }

  compararTipoDocumeto(tipoDocumento1: TipoDocumento, tipoDocumento2: TipoDocumento): boolean{
    if (tipoDocumento1 == null || tipoDocumento2 == null) {
      return false;
    }
    return tipoDocumento1.idTipoDocumento === tipoDocumento2.idTipoDocumento;
  }


  compararInstitucionEducativa(institucionEducativa1: InstitucionEducativa, institucionEducativa2: InstitucionEducativa): boolean{
    if (institucionEducativa1 == null || institucionEducativa2 == null) {
      return false;
    }
    return institucionEducativa1.idInstitucionEducativa === institucionEducativa2.idInstitucionEducativa;
  }
  
  registrar(): void {
    Swal.fire({
      title: '¿Desea guardar la información?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `no`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.establecerComando();

        if ( this.idEstudiante === 0){
           this.insertarInformacion();
        }else{
           this.editarInformacion();
        }




      } else if (result.isDenied) {
        Swal.fire('Los cambios no fueron guardados', '', 'info');
      }
    });
  }

  insertarInformacion(): void{
    this.estudianService.insertar(this.comandoEstudiante).subscribe(
         resp =>{
             Swal.fire('la Información fue guardada con éxito!', '', 'success');
             this.router.navigate(['/listar']);
         }
    );
  }

  editarInformacion() : void{
    this.estudianService.editar(this.comandoEstudiante).subscribe(
      resp =>{
          Swal.fire('la Información fue editada con éxito!', '', 'success');
          this.router.navigate(['/listar']);
      }
 );
  }

  establecerComando(): void{
    this.comandoEstudiante = new ComandoEstudiante();
    this.comandoEstudiante.idEstudiante = this.idEstudiante;
    this.comandoEstudiante.idTipoDocumento = this.estudiante.tipoDocumento.idTipoDocumento;
    this.comandoEstudiante.numeroDocumento = this.estudiante.numeroDocumento;
    this.comandoEstudiante.nombres = this.estudiante.nombres;
    this.comandoEstudiante.apellidos = this.estudiante.apellidos;
    this.comandoEstudiante.idInstitucionEducativa = this.estudiante.institucionEducativa.idInstitucionEducativa;
  }

}
