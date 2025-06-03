'use client';
import styles from './dashboard.module.css'
import {Road_Rage} from 'next/font/google'
import {Poppins} from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Notification } from '@/types/notification';
import { getNotificaciones, getNotificacionesById } from '@/Utils/Services'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const RoadRage = Road_Rage({
  weight: '400',
  subsets: ['latin']
})


export default function DashboardPage(){

    const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
    const [notificacionesOpen, setNotificacionesOpen] = useState<boolean>(false);

    useEffect(() => {
        const cargarNotificaciones = async () => {
            const notificacionesData = await notificacionesService();
            if(localStorage.getItem("rol") === "Paciente") {
                setNotificaciones([notificacionesData]);
            } else {
                setNotificaciones(notificacionesData);
            }
            
        };

        if (notificacionesOpen) {
            cargarNotificaciones();
        }
        }, [notificacionesOpen]);

        const notificacionesService = async () => {
            try {
                if(localStorage.getItem("rol") === "Paciente") {
                    const response = await getNotificacionesById(localStorage.getItem("idUser"));
                    return response
                } else {
                    const response = await getNotificaciones();
                    return response
                }
                
            } catch (error) {
                console.log("Error al obtener notificaciones: ", error)
                return [];
            }
               
        };


    return (
        <section className={styles.dash}>
            <div className={`${RoadRage.className} ${styles.dashboard}`}>
                <h2 className={styles.dashboard_tittle}>Bienvenido a Telemedicina</h2>
                <p className={`${poppins.className} ${styles.dashboard_paragraph}`}>
                Tu bienestar es nuestra prioridad. Te facilitamos el acceso a herramientas digitales para mejorar la gestión de terapias, citas y seguimiento de pacientes.
                <br></br> <br></br> 
                <a className={styles.dashboard_paragraph_bold}>🔹 Gestión eficiente:</a> Organiza historias clínicas y tratamientos en un solo lugar.<br></br> 
                <a className={styles.dashboard_paragraph_bold}>🔹 Citas sin complicaciones: </a> Programa y recibe recordatorios automáticos.
                <br></br> 
                <a className={styles.dashboard_paragraph_bold}>🔹 Atención personalizada:</a> Accede a recomendaciones y ejercicios diseñados para cada paciente. 
                <br></br> <br></br> 
                Explora nuestras funcionalidades y lleva tu experiencia de atención al siguiente nivel. 📌 ¡Empieza ahora y descubre cómo podemos ayudarte!
                </p>
                <div className={styles.dashboard_imgContainer}>
                <Image
                    src="/telemedicinaDashboard.png"
                    width={300}
                    height={100}
                    alt="Telemedicina imagen"
                    className={styles.dashboard_img}
                />
                </div>
                <Image
                    src="/Campana.png"
                    width={300}
                    height={100}
                    alt="Telemedicina imagen"
                    className={styles.dashboard_notificationImg}
                    onClick={() => setNotificacionesOpen(!notificacionesOpen)}
                />
                { notificacionesOpen ? (
                    
                    <section className={styles.notification}>
                        {notificaciones.map((notificacion) => (
                            <div key={notificacion.idNotificacion} className={styles.notification_div}>
                                <Image
                                    src="/Mensaje.png"
                                    width={100}
                                    height={100}
                                    alt="Telemedicina imagen"
                                    className={styles.notification_divImg}
                                />
                                <div className={styles.notification_divInfo}>
                                    <p  className={styles.notification_divTitle}>{notificacion.mensaje}</p>
                                    <p  className={styles.notification_divMesagge}>{notificacion.fecha}</p>
                                </div>
                            </div>
                        ))}
                        <button 
                            className={styles.notification_close}
                            onClick={() => setNotificacionesOpen(!notificacionesOpen)}>
                            X
                        </button>
                    </section> 
                    )
                    : <></>
                }
            </div>
        </section>
    )
}