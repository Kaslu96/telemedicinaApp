'use client';
import { useEffect, useState } from "react";
import surveysData from "@/data/surveys.json"
import { Encuesta } from "@/types/encuestas";
import styles from "./encuestas.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    setTimeout(() => setEncuestas(surveysData), 500);
  }, []);

  return (
    <section className={styles.encuesta}>
        <div className={ styles.encuestaDashboard}>
            <Image
                src="/BotonAgregar.png"
                width={100}
                height={100}
                alt="Telemedicina imagen"
                className={localStorage.getItem("rol") === "admin" ? styles.encuesta_agregar : styles.ocultar}
                onClick={() => {router.push("/dashboard/crearEncuesta")}}
            />
            <table className={styles.encuestaTable}>
            <thead>
                <tr>
                <th className={`${styles.encuesta_rowTitle} && ${styles.border_right}`}>{ICONOS.nombre} Nombre</th>
                <th className={`${styles.encuesta_rowTitle} && ${styles.border_right}`}>{ICONOS.fecha} Fecha</th>
                <th className={`${styles.encuesta_rowTitle} && ${styles.border_right}`}>{ICONOS.respuestas} Respuestas</th>
                <th className={`${styles.encuesta_rowTitle} && ${styles.border_right}`}>{ICONOS.estado} Estado</th>
                { localStorage.getItem("rol") === "admin" &&
                  (<th className={styles.encuesta_rowTitle}>{ICONOS.acciones} Acciones</th>)
                }
                </tr>
            </thead>
            <tbody>
                {encuestas.map((encuesta, index) => (
                <tr key={index} >
                    <td className={`${styles.encuesta_row} && ${styles.border}`}>{encuesta.nombre}</td>
                    <td className={`${styles.encuesta_row} && ${styles.border}`}>{encuesta.fecha}</td>
                    <td className={`${styles.encuesta_row} && ${styles.border}`}>{encuesta.respuestas}</td>
                    { encuesta.estado === "Activo" ? 
                        <td className={`${styles.encuesta_row} && ${styles.border}`}>{ICONOS.activo} {encuesta.estado}</td>
                        : <td className={`${styles.encuesta_row} && ${styles.border}`}>{ICONOS.inactivo} {encuesta.estado}</td>
                        
                    }
                    { localStorage.getItem("rol") === "admin" &&
                      <td className={`${styles.encuesta_row} && ${styles.border_top} && ${styles.encuesta_row_link}`}>{ICONOS.editar}Editar</td>
                    }
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </section>
  );
}