export interface Cita {
    idCita: number,
    idPaciente: number,
    fecha: string,
    descripcion: string,
    diagnosticos: Array<unknown>
}
