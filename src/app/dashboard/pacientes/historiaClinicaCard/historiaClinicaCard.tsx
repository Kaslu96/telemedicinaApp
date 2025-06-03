"use client"
import styles from "./historiaClinicaCard.module.css"
import Image from "next/image"

interface Props {
  index: number;
  onClick?: () => void;
}

export default function HistoriaClinicaCard({ index, onClick}: Readonly<Props>) {

    return (
        <div className={styles.historia_card} onClick={onClick}>
            <Image
                src="/historiaClinica.png"
                width={100}
                height={100}
                alt="Telemedicina imagen"
                className={styles.historia_cardImg}
            />
            <p className={styles.historia_cardText}>Historia Clinica #{ index + 1 } </p>
        </div>
    )
}