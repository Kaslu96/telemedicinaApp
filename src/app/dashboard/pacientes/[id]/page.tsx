"use client"
import styles from "./historiaClinica.module.css"
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { getPacientesByID, getSignalsByID, getHistoriaByPatientId, getDiagnosticoById, getTratamientosById, getMedicamentosById, getInformesById, getAntecedentesById, getCitasById } from "@/Utils/Services"
import { Paciente, Vitals } from "@/types/paciente"
import { Cita } from "@/types/cita"
import { Diagnostico } from "@/types/diagnostico";
import { Road_Rage } from "next/font/google"
import { HistoriasClinicas } from "@/types/historiaClinica";
import HistoriaClinicaCard from "../historiaClinicaCard/historiaClinicaCard";
import { Tratamientos } from "@/types/tratamientos";
import { Medicamento } from "@/types/medicamento";
import { Antecedentes } from "@/types/antecedentes";
import { Informes } from "@/types/informes";

interface Props {
  params: { id: string }
}

const RoadRage = Road_Rage({
  weight: '400',
  subsets: ['latin']
})

const ICONOS = {
  altura: '📏',
  peso: '⚖️',
  masaCorporal: '💪',
  temperatura: '🌡️',
  frecuenciaRespiratoria: '🫁',
  presionArterial: '❤️',
  frecuenciaCardiaca: '💓',
};

export default function HistoriaClinica({ params }: Props) {
  const { id } = params;
  const router = useRouter();

  const [esTerapeuta, setEsTerapeuta] = useState(false);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [signosVitales, setSignosVitales] = useState<Vitals | null>(null);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [historiasClinicas, setHistoriasClinicas] = useState<HistoriasClinicas[]>([]);
  const [diagnostico, setDiagnostico] = useState<Diagnostico | null>(null);
  const [diagnosticoId, setDiagnosticoId] = useState<number | null>(null);
  const [tratamientos, setTratamientos] = useState<Tratamientos | null>(null);
  const [tratamientosId, settratamientosId] = useState<number | null>(null);
  const [medicamentos, setMedicamentos] = useState<Medicamento | null>(null);
  const [antecedentes, setAntecedentes] = useState<Antecedentes | null>(null);
  const [informes, setInformes] = useState<Informes | null>(null);
  const [currentHistoria, setCurrentHistoria] = useState<number | null>(null);

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    setEsTerapeuta(rol === "Terapeuta");
  }, []);

  useEffect(() => {
    const cargarDatos = async () => {
      const p = await getPacientesByID(id);
      const s = await getSignalsByID(id);
      const h = await getHistoriaByPatientId(id);
      const c = await getCitasById(id);
      setPaciente(p);
      setSignosVitales(s);
      setHistoriasClinicas(h);
      setCitas(c);
    };
    cargarDatos();
  }, [id]);

  useEffect(() => {
    const cargarDatos = async () => {
      console.log("CurrentHistoria => " + currentHistoria)
      if (currentHistoria != null) {
        const i = await getInformesById(currentHistoria);
        const a = await getAntecedentesById(currentHistoria);
        setInformes(i);
        setAntecedentes(a);
      } 
    };
    cargarDatos();
  }, [currentHistoria]);

  useEffect(() => {
    const cargarDatosRelacionados = async () => {
      if (diagnosticoId) {
        const d = await getDiagnosticoById(diagnosticoId);
        setDiagnostico(d);
      } else {
        setDiagnostico(null);
      }

      if (tratamientosId) {
        const t = await getTratamientosById(tratamientosId);
        setTratamientos(t);

        if (t?.idMedicamento) {
          const m = await getMedicamentosById(t.idMedicamento);
          setMedicamentos(m);
        } else {
          setMedicamentos(null);
        }
      } else {
        setTratamientos(null);
        setMedicamentos(null);
      }
    };
    cargarDatosRelacionados();
  }, [diagnosticoId, tratamientosId]);

  function calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

  const handleDownload = () => {
    window.print();
  };

  return (
    <section className={styles.historia} id="contenido-a-descargar">
      <div className={styles.historia_Info}>
        <div className={styles.historia_InfoGeneral}>
           <Image
            src="/RetrocederEspecialista.png"
            width={100}
            height={100}
            alt="Telemedicina imagen"
            onClick={() => router.push("/dashboard/pacientes")}
            className={styles.historia_ImgDevolver}
          />
          <Image
            src="/ImagenPaciente.png"
            width={100}
            height={100}
            alt="Telemedicina imagen"
            className={styles.historia_ImgPaciente}
          />
          <div className={styles.historia_InfoGeneralText}>
            <p className={styles.historia_name}>{paciente?.nombre} {paciente?.apellido}</p>
            <p className={styles.historia_birthday}>
              {paciente?.fechaNacimiento} - {paciente ? calcularEdad(paciente.fechaNacimiento) : null}
            </p>
          </div>
        </div>

        <div className={styles.historia_table}>
          <div className={styles.historia_tableTitle}>ULTIMOS SIGNOS VITALES</div>

          {signosVitales && (
            <>
              <div className={styles.historia_row}>
                <p className={styles.historia_rowText}>{ICONOS.altura} Altura</p>
                <p className={styles.historia_rowUnit}>{signosVitales?.altura} Mts</p>
              </div>
              <div className={styles.historia_row}>
                <p className={styles.historia_rowText}>{ICONOS.peso} Peso</p>
                <p className={styles.historia_rowUnit}>{signosVitales?.peso} Kg</p>
              </div>
              <div className={styles.historia_row}>
                <p className={styles.historia_rowText}>{ICONOS.masaCorporal} Masa Corporal</p>
                <p className={styles.historia_rowUnit}>{signosVitales.masaCorporal} IMC</p>
              </div>
              <div className={styles.historia_row}>
                <p className={styles.historia_rowText}>{ICONOS.temperatura} Temperatura</p>
                <p className={styles.historia_rowUnit}>{signosVitales.temperatura} C</p>
              </div>
              <div className={styles.historia_row}>
                <p className={styles.historia_rowText}>{ICONOS.frecuenciaRespiratoria} Frecuencia Respiratoria</p>
                <p className={styles.historia_rowUnit}>{signosVitales.frecuenciaRespiratoria} r/m</p>
              </div>
              <div className={styles.historia_row}>
                <p className={styles.historia_rowText}>{ICONOS.presionArterial} Presión Arterial</p>
                <p className={styles.historia_rowUnit}>{signosVitales.presionArterial} mmHg</p>
              </div>
              <div className={styles.historia_row}>
                <p className={styles.historia_rowText}>{ICONOS.frecuenciaCardiaca} Frecuencia Cardiaca</p>
                <p className={styles.historia_rowUnit}>{signosVitales.frecuenciaCardiaca} l/m</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.pageBreak}></div>

      <div className={styles.historia_Details}>

        <button onClick={handleDownload} className={styles.historia_download}>
            <Image
              src="/Descargar.png"
              width={100}
              height={100}
              alt="Descargar historia clínica"
            />
        </button>

        <div className={styles.historia_DetailsDashboard}>

          <div className={styles.historia_AntecedentesTitle}>
            <p className={RoadRage.className}>Historias Clinicas</p>
            
          </div>
          {esTerapeuta && (
            <button
              className={styles.historia_agregarBtn}
              onClick={() => router.push(`/dashboard/agregarHistoria?idPaciente=${id}&idTerapeuta=${localStorage.getItem("idUser")}`)}
            >
              ➕ Agregar Historia Clínica
            </button>
          )}
          <article className={styles.historia_Antecedentes}>
            <div className={styles.historia_AntecedentesTitle}>
              <p className={RoadRage.className}>Historias Clinicas</p>
            </div>  
            <div className={styles.historia_AntecedentesText}>
              {historiasClinicas?.map((historia, index) => (
                <HistoriaClinicaCard 
                  key={index} 
                  index={index} 
                  onClick={() => {
                    setDiagnosticoId(historia.idDiagnostico)
                    settratamientosId(historia.idTratamiento)
                    setCurrentHistoria(historia.idHistClin)
                  }} 
                />
              ))}
            </div> 
          </article>

          <article className={`${styles.historia_Antecedentes}  ${styles.historia_AntecedentesScroll}`}>
            <div className={styles.historia_AntecedentesContainer}>
              { antecedentes != null ?
                <section>
                  <h2 className={styles.historia_AntecedentesSubtitle}>Antecedentes</h2>
                  <p className={styles.historia_AntecedentesTxt}> {antecedentes.descripcion}</p>
                </section> : null
              }

              { diagnostico != null ?
                <section>
                  <h2 className={styles.historia_AntecedentesSubtitle}>Diagnostico - {diagnostico?.nombre}</h2>
                  <p className={styles.historia_AntecedentesTxt}> {diagnostico?.descripcion}</p>
                </section> : null
              }
              { medicamentos != null ?
                <section>
                  <h2 className={styles.historia_AntecedentesSubtitle}>Medicamentos - {medicamentos.descripcion}</h2>
                  <p className={styles.historia_AntecedentesTxt}>{medicamentos.nombre} - Cantidad: {medicamentos.cantidad}</p>
                </section> : null
              }
              { tratamientos != null ?
                <section>
                  <h2 className={styles.historia_AntecedentesSubtitle}>Tratamientos</h2>
                  <p className={styles.historia_AntecedentesTxt}> {tratamientos?.descripcion}</p>
                </section> : null
              }

              { informes != null ?
                <section>
                  <h2 className={styles.historia_AntecedentesSubtitle}>Informes - {informes.fecha}</h2>
                  <p className={styles.historia_AntecedentesTxt}> {informes.descripcion}</p>
                </section> : null
              }
            </div>
          </article>
          <table className={styles.citas_table}>
            <thead>
              <tr>
                <th colSpan={4} className={styles.citas_title}>TUS CITAS</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita: Cita) => {
                const fecha = (cita.fecha).toLocaleString();
                return (
                  <tr key={cita.idCita} className={styles.tr}>
                    <td className={styles.colFecha}>📅 {fecha}</td>
                    <td className={styles.colDescripcion}>📋 Descripcion: {cita.descripcion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.citas_buttonContainer}>
            <button className={styles.citas_button} onClick={() => router.push(`/dashboard/agendarCita?idPaciente=${id}`)}>
              📅 Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
