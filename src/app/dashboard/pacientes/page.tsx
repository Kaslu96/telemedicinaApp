"use client";
import styles from "./pacientes.module.css"
import { useState, useEffect } from "react";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { Paciente } from "@/types/paciente";
import { getPacientes } from "@/Utils/Services"

export default function PatientList() {
  const [patients, setPatients] = useState<Paciente[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter()

  useEffect(() => {
    const cargarPacientes = async () => {
      const pacientesData = await getPacientes();
      setPatients(pacientesData)
    }
    cargarPacientes();
  }, [search]);

  const filteredPatients = patients.filter((patient) =>
    patient.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (localStorage.getItem("rol") === "Paciente") {
    router.push('/dashboard/pacientes/'+ localStorage.getItem("idUser"))
  } else {
    return (
      <div className={styles.pacientes}>
          <div className={styles.paciente_search}>
          <input
              type="text"
              placeholder="Ingrese el nombre del paciente"
              className={styles.paciente_search_input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
          <Image
              src="/X.png"
              width={15}
              height={15}
              alt={"x"}
              className={styles.paciente_search_x}
          />
          </div>
          
          <div className={styles.paciente_dashboard}>
            {filteredPatients.length != 0 ? (
              <>
                {filteredPatients.map((patient, idx) => (
                  <div 
                    key={idx} 
                    className={styles.paciente_dashboard_label}
                    onClick={() => router.push('/dashboard/pacientes/'+ patient.idUsuario)}>
                      <Image
                        src={"/Perfil.png"}
                        width={100}
                        height={100}
                        alt={`Imagen de ${patient.nombre}`}
                        className=""
                      />
                      <div className={styles.paciente_dashboard_labelText}>
                          <h3 className="">{patient.nombre} {patient.apellido}</h3>
                          <p className="">{patient.cedula}</p>
                          <p className="">{patient.direccion}</p>
                          <p className="">{patient.fechaNacimiento}</p>
                      </div>
                  </div>
              ))}</>
            ) : <span className={styles.loader2}></span>
              }
          </div>
      </div>
    );

  }
}
