"use client"
import { useState } from "react";
import styles from "./crearEncuesta.module.css";
import { Road_Rage } from 'next/font/google';
import {Poppins} from 'next/font/google'
import Image from 'next/image';
import { useRouter } from "next/navigation";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})
const RoadRage = Road_Rage({
    weight: '400',
    subsets: ['latin']
});

export default function CrearFormulario() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [save, setSave] = useState<boolean>(false);
  const router = useRouter();

  const handleAddQuestion = () => {
    const nuevaPregunta = prompt("Escribe la nueva pregunta:");
    if (nuevaPregunta && nuevaPregunta.trim()) {
      setQuestions(prev => [...prev, nuevaPregunta.trim()]);
    }
  };

  return (
    <form className={styles.container}>
        <Image
          src="/Save.png"
          width={300}
          height={100}
          alt="Telemedicina imagen"
          className={styles.guardarLogo}
          onClick={() => {setSave(!save)}}
        />

        <h2 className={styles.title}>📄 Crear Formulario de Retroalimentación</h2>

        <div className={styles.labelContainer}>
            <label className={styles.label}>📌 Título del formulario:</label>
            <input
            type="text"
            className={styles.inputText}
            />
        </div>

        <div className={styles.labelContainer}>
            <label className={styles.label}>📌 Descripción:</label>
            <input
            type="text"
            className={styles.inputText}
            />
        </div>

        <div className="mt-4">
            <button
            type="button"
            onClick={handleAddQuestion}
            className={`${RoadRage.className} ${styles.agregarPregunta}`}
            >
            [Agregar otra pregunta]
            </button>
        </div>
        <div className={styles.questionContainer}>
            {questions.map((q, index) => (
                <div key={index}>
                    <label className={`${poppins.className} ${styles.labelQuestion}`}>
                        {index + 1}. {q}
                    </label>
                </div>
            ))}
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
                <p className={`${RoadRage.className} ${styles.saveTitle}`}>FORMULARIO <br></br>CREADO EXITOSAMENTE</p>
                <button 
                    className={`${RoadRage.className} ${styles.saveButton}`}
                    onClick={() => {router.push("/dashboard/encuestas")}}
                >OK</button>
            </div>  
        </section> 
    </form>
  );
}