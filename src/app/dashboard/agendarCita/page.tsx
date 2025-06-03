"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./agendarCita.module.css";
import Image from "next/image";
import { Road_Rage } from "next/font/google";
import { createCita } from "@/Utils/Services";
import { useSearchParams } from "next/navigation";

const RoadRage = Road_Rage({
  weight: "400",
  subsets: ["latin"],
});

export default function AgendarCita() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idPaciente = Number(searchParams.get("idPaciente"));

    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("Consulta general inicial");
    const [save, setSave] = useState<boolean>(false);

    const handleAgendar = async () => {
        if (!fecha) {
        alert("Por favor selecciona una fecha válida.");
        return;
        } else {
            const datosCita = {
                idPaciente,
                fecha,
                descripcion,
            };

            try {
                await createCita(datosCita);
                setSave(true);
            } catch (error) {
                console.error("Error al crear la cita:", error);
                alert("Hubo un error al agendar la cita. Inténtalo de nuevo.");
            }
        }

        
    };

    const handleEnviar = () => {
        router.push(`/dashboard/pacientes/${idPaciente}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formulario}>
                <h2 className={`${RoadRage.className} ${styles.titulo}`}>
                Seleccione una <b>fecha</b> y <b>tipo</b> de cita
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
                    <p className={styles.label}>Descripción</p>
                    <select
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className={styles.input}
                    >
                        <option value="Consulta general inicial">Consulta general inicial</option>
                        <option value="Control">Control</option>
                        <option value="Urgencia">Urgencia</option>
                        <option value="Valoración especialista">Valoración especialista</option>
                    </select>
                </label>

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
            <p className={`${RoadRage.className} ${styles.saveTitle}`}>
                CITA AGENDADA EXITOSAMENTE
            </p>
            <button
                className={`${RoadRage.className} ${styles.saveButton}`}
                onClick={handleEnviar}
            >
                OK
            </button>
            </div>
        </section>
        </div>
    );
}
