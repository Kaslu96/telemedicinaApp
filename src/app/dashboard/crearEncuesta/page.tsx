"use client"
import { useState } from "react";
import styles from "./crearEncuesta.module.css";
import { Road_Rage } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { createSurvey } from "@/Utils/Services";

const RoadRage = Road_Rage({
  weight: '400',
  subsets: ['latin']
});

export default function CrearFormulario() {

  const [save, setSave] = useState<boolean>(false);
  const [titulo, setTitulo] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const router = useRouter();

  const handleClick = () => {
    window.open("https://forms.office.com/", "_blank");
  };

  const handleSave = async () => {
    if (!titulo || !url) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const idUser = localStorage.getItem("idUser");
      if (idUser) {
        await createSurvey(titulo, url, true, parseInt(idUser));
        setSave(true);
      }
    } catch (error) {
      console.error("Error al guardar la encuesta:", error);
    }
  };

  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <Image
        src="/Save.png"
        width={300}
        height={100}
        alt="Guardar encuesta"
        className={styles.guardarLogo}
        onClick={handleSave}
      />

      <h2 className={styles.title}>📄 Crear Formulario de Retroalimentación</h2>

      <p className={styles.description}>
        Para registrar un formulario, primero deberás crearlo desde Microsoft Forms{" "}
        <a onClick={handleClick}>Haz click aquí</a>
      </p>

      <div className={styles.labelContainer}>
        <label className={styles.label}>📌 Título del formulario:</label>
        <input
          type="text"
          className={styles.inputText}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className={styles.labelContainer}>
        <label className={styles.label}>📌 URL asociada:</label>
        <input
          type="text"
          className={styles.inputText}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <section className={save ? styles.blurContainer : styles.ocultar}>
        <div className={styles.saveAlert}>
          <Image
            src="/Calendario.png"
            width={300}
            height={100}
            alt="Formulario guardado"
            className={styles.calendarioLogo}
          />
          <p className={`${RoadRage.className} ${styles.saveTitle}`}>FORMULARIO <br />CREADO EXITOSAMENTE</p>
          <button
            className={`${RoadRage.className} ${styles.saveButton}`}
            onClick={() => router.push("/dashboard/encuestas")}
          >
            OK
          </button>
        </div>
      </section>
    </form>
  );
}
