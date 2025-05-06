"use client";
import { useRouter } from "next/navigation";
import styles from "./recuperarCuenta.module.css"
import Image from 'next/image'

export default function LoginPage(){

    const router = useRouter();

    return (
        <section className={styles.recovery}>
            <div className={styles.recoveryDecorator}>
                <Image
                    src="/TelemedicinaLogo.png"
                    width={300}
                    height={300}
                    alt="Telemedicina imagen"
                    className={styles.recoveryDecorator_logo}
                />
                <Image
                    src="/TelemedicinaTitle.png"
                    width={300}
                    height={100}
                    alt="Telemedicina imagen"
                    className={styles.recoveryDecorator_logoTxt}
                />
            </div>

            <div className={styles.recoveryForm}> 
                <div className={styles.recoveryForm_divBorder}></div>  
                <div className={styles.recoveryForm_divColumn}>
                    <p className={styles.recoveryForm_text}>Ingrese su correo electronico</p>
                    <input 
                        type="text" 
                        name="user" 
                        className={styles.recoveryForm_input}
                    />
                </div>
                <div className={styles.recoveryForm_div}>
                    <p className={styles.recoveryForm_smallText}>¿Ya tienes tu contraseña?</p>
                    <a 
                        className={styles.recoveryForm_linkText} 
                        onClick={() => {router.push("/login")}}
                        >
                            Haga click aquí
                    </a>  
                </div>
                <button 
                    className={styles.recoveryForm_IniciarSesionnBtn}>
                    <Image
                        src="/recuperarContra.png"
                        width={300}
                        height={100}
                        alt="Telemedicina imagen"
                        className={styles.recoveryForm_RecoverySesionImg}
                    />
                </button>
                <div className={styles.recoveryForm_divBorder}></div>
            </div>
        </section>
    )
}