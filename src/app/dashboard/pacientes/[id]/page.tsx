"use client"
import styles from "./historiaClinica.module.css"
import pacientes from "@/data/patients.json"
import { Paciente } from "@/types/paciente"
import { Road_Rage } from "next/font/google"
import Image from 'next/image'
import citas from "@/data/citas.json"
import { Cita } from "@/types/cita"
import { useRouter } from "next/navigation"
import html2pdf from "html2pdf.js";
// 
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
  
  const infoPaciente = (id: string): Paciente | undefined => {
    return pacientes.find((paciente) => paciente.id.toString() === id);
  };
  const { id } = params;
  const paciente = infoPaciente(id)
  const router = useRouter()

  const handleDownload = () => {
    window.print();
  };
  
  return (
    <section className={styles.historia} id="contenido-a-descargar">

      <div className={styles.historia_Info}>
        <div className={styles.historia_InfoGeneral}>
          <Image
            src="/ImagenPaciente.png"
            width={100}
            height={100}
            alt="Telemedicina imagen"
            className={styles.historia_ImgPaciente}
          />
          <div className={styles.historia_InfoGeneralText}>
            <p className={styles.historia_name}>{paciente?.name}</p>
            <p className={styles.historia_birthday}>{paciente?.birthdate} - {paciente?.age} años</p>
          </div>
        </div>
        <div className={styles.historia_table}>
          <div className={styles.historia_tableTitle}>
            ULTIMOS SIGNOS VITALES
          </div>
          <div className={styles.historia_row}>
            <p className={styles.historia_rowText}>{ICONOS.altura} Altura</p>
            <p className={styles.historia_rowUnit}>{paciente?.vitals.altura.value} {paciente?.vitals.altura.unit}</p>
          </div>
          <div className={styles.historia_row}>
            <p className={styles.historia_rowText}>{ICONOS.peso} Peso</p>
            <p className={styles.historia_rowUnit}>{paciente?.vitals.peso.value} {paciente?.vitals.peso.unit}</p>
          </div>
          <div className={styles.historia_row}>
            <p className={styles.historia_rowText}>{ICONOS.masaCorporal} Masa Corporal</p>
            <p className={styles.historia_rowUnit}>{paciente?.vitals.masaCorporal.value} {paciente?.vitals.masaCorporal.unit}</p>
          </div>
          <div className={styles.historia_row}>
            <p className={styles.historia_rowText}>{ICONOS.temperatura} Temperatura</p>
            <p className={styles.historia_rowUnit}>{paciente?.vitals.temperatura.value} {paciente?.vitals.temperatura.unit}</p>
          </div>
          <div className={styles.historia_row}>
            <p className={styles.historia_rowText}>{ICONOS.frecuenciaRespiratoria} Frecuencia Respiratoria</p>
            <p className={styles.historia_rowUnit}>{paciente?.vitals.frecuenciaRespiratoria.value} {paciente?.vitals.frecuenciaRespiratoria.unit}</p>
          </div>
          <div className={styles.historia_row}>
            <p className={styles.historia_rowText}>{ICONOS.presionArterial} Presion Arterial</p>
            <p className={styles.historia_rowUnit}>{paciente?.vitals.presionArterial.value} {paciente?.vitals.presionArterial.unit}</p>
          </div>
          <div className={styles.historia_row}>
            <p className={styles.historia_rowText}>{ICONOS.frecuenciaCardiaca} Frecuencia Cardiaca</p>
            <p className={styles.historia_rowUnit}>{paciente?.vitals.frecuenciaCardiaca.value} {paciente?.vitals.frecuenciaCardiaca.unit}</p>
          </div>
        </div>
      </div>

      <div className={styles.pageBreak}></div>

      <div className={styles.historia_Details}>

        <div className={styles.historia_DetailsDashboard}>
          <h2 className={`${RoadRage.className} ${styles.historia_DetailsDashboardTitle}`}>HISTORIAL CLINICO</h2>
          <article className={styles.historia_Antecedentes}>
            <div className={styles.historia_AntecedentesTitle}>
              <p>Antecedetes</p>
            </div>   
            <div className={styles.historia_AntecedentesText}>
              <p>{paciente?.historiaClinica.antecedentes}</p>
            </div> 
          </article>
          <button onClick={handleDownload} className={styles.historia_download}>
            <Image
              src="/Descargar.png"
              width={100}
              height={100}
              alt="Descargar historia clínica"
            />
          </button>
          <table className={styles.citas_table}>
            <thead>
              <tr>
                <th colSpan={4} className={styles.citas_title}>TUS CITAS</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita: Cita) => {
                const fecha = new Date(cita.fechaHora);
                return (
                  <tr key={cita.id}>
                    <td>📅 Fecha y hora: {fecha.toLocaleDateString('es-ES')} - {fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>🏥 Médico: {cita.medico}</td>
                    <td>📋 Especialidad: {cita.especialidad}</td>
                    <td>📌 Estado: {cita.estado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.citas_buttonContainer}>
            <button className={styles.citas_button} onClick={() => {router.push("/dashboard/agendarCita")}}>📅 Agendar Cita</button>
          </div>
        </div>
      </div>

    </section>
  );
}