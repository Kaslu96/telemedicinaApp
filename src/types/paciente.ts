export interface Vitals {
    idSignos: number;
    altura: number;
    peso: number;
    masaCorporal: number;
    temperatura: number;
    frecuenciaRespiratoria: number;
    presionArterial: number;
    frecuenciaCardiaca: number;
    paciente: number;
    idPacienteNavigation: string;
}

export interface Paciente {
    idUsuario: number;
    cedula: number;
    nombre: string;
    apellido: string;
    contrasena: string;
    telefono: string;
    correo	: string;
    fechaNacimiento: string;
    direccion: string;
}
  