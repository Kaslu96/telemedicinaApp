"use client";
import { logout } from '@/Utils/Auth';
import { useRouter } from "next/navigation";
import styles from './layout.module.css';
import Image from 'next/image';
import { Road_Rage } from 'next/font/google';
import { useEffect, useState } from 'react';

const RoadRage = Road_Rage({
  weight: '400',
  subsets: ['latin']
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    setRol(storedRol);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!rol) return null; // O puedes mostrar un loader o placeholder

  return (
    <section>
      <div className={`${RoadRage.className} ${styles.header}`}>
        <Image
          src="/TelemedicinaLogo.png"
          width={300}
          height={100}
          alt="Telemedicina imagen"
          className={styles.header_logo}
        />

        <h2 className={styles.header_btn} onClick={() => router.push("/dashboard")}>
          Inicio
        </h2>

        {(rol === "admin" || rol === "employee") && (
          <h2 className={styles.header_btn} onClick={() => router.push("/dashboard/pacientes")}>
            Pacientes
          </h2>
        )}

        {rol === "patient" && (
          <h2 className={styles.header_btn} onClick={() => router.push("/dashboard/pacientes")}>
            Mi historial
          </h2>
        )}

        {(rol === "admin" || rol === "patient") && (
          <h2 className={styles.header_btn} onClick={() => router.push("/dashboard/encuestas")}>
            Encuestas
          </h2>
        )}

        <Image
          onClick={handleLogout}
          src="/BotonCerrarSesion.png"
          width={300}
          height={100}
          alt="Cerrar sesión"
          className={styles.header_logout}
        />
      </div>
      {children}
    </section>
  );
}
