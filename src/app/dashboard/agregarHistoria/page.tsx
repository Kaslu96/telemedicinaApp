'use client';
import React, { useEffect, useState } from 'react';
import styles from './agregarHistoria.module.css';
import { getCitasById, getMedicamentos } from '@/Utils/Services';
import { agregarDiagnostico, agregarTratamiento, agregarHistoriaClinica, agregarAntecedente, agregarInforme } from '@/Utils/Services';
import { Cita } from '@/types/cita';
import { Medicamento } from '@/types/medicamento';
import { useSearchParams } from "next/navigation";


const AgregarHistoria = () => {

    const searchParams = useSearchParams();
    const idPaciente = Number(searchParams.get("idPaciente"));
    const idTerapeuta = Number(searchParams.get("idTerapeuta"));


    const [citas, setCitas] = useState<Cita[]>([]);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    const [citaSeleccionada, setCitaSeleccionada] = useState<number | null>(null);
    const [nombreDiagnostico, setNombreDiagnostico] = useState('');
    const [descripcionDiagnostico, setDescripcionDiagnostico] = useState('');

    const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState<number | null>(null);
    const [cantidadMedicamento, setCantidadMedicamento] = useState('');
    const [descripcionMedicamento, setDescripcionMedicamento] = useState('');

    const [descripcionTratamiento, setDescripcionTratamiento] = useState('');
    const [descripcionAntecedente, setDescripcionAntecedente] = useState('');
    const [descripcionInforme, setDescripcionInforme] = useState('');

    useEffect(() => {
        getCitasById(idPaciente).then(setCitas);
        getMedicamentos().then(setMedicamentos);
    }, [idPaciente]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cita = citas.find(c => c.idCita === citaSeleccionada);

        const hoy = new Date();
        const hoySoloFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        if (cita) {
            const [year, month, day] = cita.fecha.split('-').map(Number);
            const fechaCita = new Date(year, month - 1, day);

            if (!(hoySoloFecha.getTime() === fechaCita.getTime())) {
                alert('La cita debe ser del día de hoy.');
                return;
            } else {
                const diagnostico = await agregarDiagnostico({ idTerapeuta: idTerapeuta, idCita: citaSeleccionada!, nombre: nombreDiagnostico, descripcion: descripcionDiagnostico });
                const tratamiento = await agregarTratamiento({ idDiagnostico: diagnostico.idDiagnostico, idMedicamento: medicamentoSeleccionado, descripcion: descripcionTratamiento });
                const historia = await agregarHistoriaClinica({ idPaciente: idPaciente, idDiagnostico: diagnostico.idDiagnostico, idTratamiento: tratamiento.idTratamiento });
                await agregarAntecedente({ idHistClin: historia.idHistClin, descripcion: descripcionAntecedente });
                await agregarInforme({ idHistClin: historia.idHistClin, fecha: cita.fecha, descripcion: descripcionInforme });

                alert('Historia clínica guardada con éxito');
            }
        }
    };
   
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Agregar Historia Clínica</h2>

        <label>Cita:</label>
        <select value={citaSeleccionada ?? ""} onChange={(e) => setCitaSeleccionada(parseInt(e.target.value))} required>
            <option value="">Seleccione una cita</option>
            {citas.map(cita => (
            <option key={cita.idCita} value={cita.idCita}>
                {(cita.fecha).toLocaleString()} - {cita.descripcion}
            </option>
            ))}
        </select>

        <label>Diagnóstico:</label>
        <input type="text" placeholder="Nombre" value={nombreDiagnostico} onChange={(e) => setNombreDiagnostico(e.target.value)} required />
        <textarea placeholder="Descripción" value={descripcionDiagnostico} onChange={(e) => setDescripcionDiagnostico(e.target.value)} required />

        <label>Medicamento:</label>
        <select value={medicamentoSeleccionado ?? ""} onChange={(e) => setMedicamentoSeleccionado(parseInt(e.target.value))} required>
            <option value="">Seleccione un medicamento</option>
            {medicamentos.map(med => (
            <option key={med.idMedicamento} value={med.idMedicamento}>{med.nombre}</option>
            ))}
        </select>
        <input type="text" placeholder="Cantidad" value={cantidadMedicamento} onChange={(e) => setCantidadMedicamento(e.target.value)} required />
        <textarea placeholder="Descripción" value={descripcionMedicamento} onChange={(e) => setDescripcionMedicamento(e.target.value)} required />

        <label>Tratamiento:</label>
        <textarea placeholder="Descripción del tratamiento" value={descripcionTratamiento} onChange={(e) => setDescripcionTratamiento(e.target.value)} required />

        <label>Antecedentes:</label>
        <textarea placeholder="Descripción de antecedentes" value={descripcionAntecedente} onChange={(e) => setDescripcionAntecedente(e.target.value)} required />

        <label>Informe:</label>
        <textarea placeholder="Descripción del informe" value={descripcionInforme} onChange={(e) => setDescripcionInforme(e.target.value)} required />

        <button type="submit">Guardar Historia Clínica</button>
        </form>
    );
};

export default AgregarHistoria;