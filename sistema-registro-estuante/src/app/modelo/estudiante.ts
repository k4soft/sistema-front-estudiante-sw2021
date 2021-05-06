import { TipoDocumento } from './tipo-documento';
import { InstitucionEducativa } from './institucion-educativa';

export class Estudiante {
    idEstudiante: number;
    tipoDocumento = new TipoDocumento();
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    institucionEducativa = new InstitucionEducativa();
}
