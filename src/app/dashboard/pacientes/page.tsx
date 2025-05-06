"use client";
import styles from "./pacientes.module.css"
import { useState, useEffect } from "react";
import patientsData from "@/data/patients.json";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { Paciente } from "@/types/paciente";

export default function PatientList() {
  const [patients, setPatients] = useState<Paciente[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter()

  useEffect(() => {
    // Simula una petición al cargar los datos
    setTimeout(() => {
      setPatients(patientsData);
    }, 500); // pequeño delay para simular una carga
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  if (localStorage.getItem("rol") === "patient") {
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
                    onClick={() => router.push('/dashboard/pacientes/'+ patient.id)}>
                      <Image
                        src={patient.image}
                        width={100}
                        height={100}
                        alt={`Imagen de ${patient.name}`}
                        className=""
                      />
                      <div className={styles.paciente_dashboard_labelText}>
                          <h3 className="">{patient.name}</h3>
                          <p className="">{patient.historiaClinica.antecedentes}</p>
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
