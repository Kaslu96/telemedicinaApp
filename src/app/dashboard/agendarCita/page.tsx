"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import especialistasData from "@/data/especialistas.json";
import { Especialista } from "@/types/especialista";
import styles from "./agendarCita.module.css"
import Image from 'next/image'
import { Road_Rage } from "next/font/google"

const RoadRage = Road_Rage({
    weight: '400',
    subsets: ['latin']
})

export default function AgendarCita() {
  const router = useRouter();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("08:00");
  const [tipoCita, setTipoCita] = useState("Control");
  const [especialistaIndex, setEspecialistaIndex] = useState(0);
  const [save, setSave] = useState<boolean>(false)

  const especialistas: Especialista[] = especialistasData;
  const especialista = especialistas[especialistaIndex];

  const handleAgendar = () => {
    if (!fecha || !hora) {
            alert("Por favor selecciona una fecha y hora válidas.");
            return;
        }
        setSave(!save)
    };

    const handleEnviar = () => { 
        router.push("/dashboard/pacientes")
    }

  return (
    <div className={styles.container}>x
        <div className={styles.containerSection}>
            <div className={styles.seccionIzquierda}>
                <h2 className={`${RoadRage.className} ${styles.titulo}`}>
                Seleccione una <b>fecha</b> y <b>hora</b> para su cita
                </h2>

                <label>
                    <p className={styles.label}>Fecha</p>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className={styles.input}
                    />
                </label>    
                <label>
                    <p className={styles.label}>Tipo de cita</p>
                    <select
                        value={tipoCita}
                        onChange={(e) => setTipoCita(e.target.value)}
                        className={styles.input}
                    >
                        <option value="Control">Control</option>
                        <option value="Consulta">Consulta</option>
                        <option value="Urgencia">Urgencia</option>
                    </select>
                </label>

                <label>
                    <p className={styles.label}>Hora</p>
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.seccionDerecha}>
                <h2 className={`${RoadRage.className} ${styles.tituloOscuro}`}>Especialistas Disponibles</h2>

                <div className={styles.slider}>
                <button
                    onClick={() => setEspecialistaIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                >
                    <Image
                        src="/RetrocederEspecialista.png"
                        width={40}
                        height={40}
                        alt="Telemedicina imagen"
                    />
                </button>
                <Image
                    src="/ImagenPaciente.png"
                    width={150}
                    height={150}
                    alt="Telemedicina imagen"
                />
                <button
                    onClick={() =>
                    setEspecialistaIndex((prev) =>
                        prev < especialistas.length - 1 ? prev + 1 : prev
                    )
                    }
                >
                    <Image
                        src="/AvanzarEspecialista.png"
                        width={40}
                        height={40}
                        alt="Telemedicina imagen"
                    />
                </button>
                </div>

                <div className={styles.infoEspecialista}>
                <p className={`${RoadRage.className} ${styles.infoEspecialista_title}`}>INFORMACION ESPECIALISTA</p>
                <p>{especialista.cedula}</p>
                <p>{especialista.nombre}</p>
                <p>{especialista.edad} Años</p>
                <p>Sede {especialista.sede}</p>
                </div>
                <div className={styles.boton_container}>
                    <button onClick={handleAgendar} className={styles.boton}>
                    📅 Agendar Cita
                    </button>
                </div>

            </div>
            
            <section className={save ? styles.blurContainer : styles.ocultar}>
                <div className={save ? styles.saveAlert : styles.ocultar}>
                    <Image
                    src="/Calendario.png"
                    width={300}
                    height={100}
                    alt="Telemedicina imagen"
                    className={styles.calendarioLogo}
                    
                    />
                    <p className={`${RoadRage.className} ${styles.saveTitle}`}>CITA AGENDADA EXITOSAMENTE</p>
                    <button 
                        className={`${RoadRage.className} ${styles.saveButton}`}
                        onClick={handleEnviar}
                    >OK</button>
                </div>  
            </section> 
        </div>
    </div>
  );
}
