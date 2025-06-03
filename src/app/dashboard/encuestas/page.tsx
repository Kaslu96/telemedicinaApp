'use client';
import { useEffect, useState } from "react";
import { Encuesta } from "@/types/encuestas";
import styles from "./encuestas.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSurveys } from "@/Utils/Services"
const ICONOS = {
    nombre: '📄',
    fecha: '📅',
    respuestas: '📊',
    estado: '🎯',
    acciones: '⚙️',
    editar: '✏️',
    activo: '🟢',
    inactivo: '🔴 '
  };

export default function SurveyTable() {
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cargarEncuestas = async () => {
      const encuestasData = await getSurveys();
      setEncuestas(encuestasData);
    }
    cargarEncuestas();
  }, []);

  return (
    <section className={styles.encuesta}>
        <div className={ styles.encuestaDashboard}>
            <Image
                src="/BotonAgregar.png"
                width={100}
                height={100}
                alt="Telemedicina imagen"
                className={localStorage.getItem("rol") === "Administrador" ? styles.encuesta_agregar : styles.ocultar}
                onClick={() => {router.push("/dashboard/crearEncuesta")}}
            />
            <table className={styles.encuestaTable}>
            <thead>
                <tr>
                <th className={`${styles.encuesta_rowTitle} && ${styles.border_right}`}>{ICONOS.nombre} Nombre</th>
                <th className={`${styles.encuesta_rowTitle} && ${styles.border_right}`}>{ICONOS.fecha} Fecha</th>
                <th className={`${styles.encuesta_rowTitle} && ${styles.border_right}`}>{ICONOS.estado} Estado</th>
                </tr>
            </thead>
            <tbody>
                {encuestas.map((encuesta, index) => (
                <tr key={index} >
                    <td className={`${styles.encuesta_row} && ${styles.border} && ${styles.link}`}
                     onClick={() => {window.open(encuesta.url, "_blank");}}>{encuesta.nombre}
                    </td>
                    <td className={`${styles.encuesta_row} && ${styles.border}`}>{encuesta.fechaCreacion}</td>
                    { encuesta.activo === true ? 
                        <td className={`${styles.encuesta_row} && ${styles.border}`}>{ICONOS.activo} Activa</td>
                        : <td className={`${styles.encuesta_row} && ${styles.border}`}>{ICONOS.inactivo} Desactivada</td>
                        
                    }
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </section>
  );
}