"use client";
import { useRouter } from "next/navigation";
import { login } from "@/Utils/Auth";
import { useState } from "react";
import styles from "./login.module.css"
import Image from 'next/image'

export default function LoginPage(){

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);

    const router = useRouter();

    const handleLogin = () => {
      login();
      router.push("/dashboard");
    };

    return (
        <section className={styles.login}>
            <div className={styles.loginForm}> 
                <div className={styles.loginForm_divBorder}></div>  
                <div className={styles.loginForm_divColumn}>
                    <p className={styles.loginForm_text}>Usuario</p>
                    <input 
                        type="text" 
                        name="user" 
                        className={styles.loginForm_input}
                    />
                </div>
                <div className={styles.loginForm_divColumn}>
                    <p className={styles.loginForm_text}>Contraseña</p>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        className={styles.loginForm_input}
                    />
                    <button 
                            type="button" 
                            onClick={togglePassword}
                            style={{
                                position: "absolute",
                                right: ".5vw",
                                top: "50%",
                                background: "none", 
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            {showPassword ? "👁️" : "🙈"}
                        </button>
                </div>
                <div className={styles.loginForm_div}>
                    <p className={styles.loginForm_smallText}>¿Has olvidado tu contraseña?</p>
                    <a 
                        className={styles.loginForm_linkText} 
                        onClick={() => {router.push("/recuperarCuenta")}}>
                            Haga click aquí
                    </a>  
                </div>
                <button 
                    className={styles.loginForm_IniciarSesionnBtn}
                    onClick={handleLogin}>
                    <Image
                        src="/IniciarSesion.png"
                        width={300}
                        height={100}
                        alt="Telemedicina imagen"
                        className={styles.loginForm_IniciarSesionImg}
                    />
                </button>
                <div className={styles.loginForm_divBorder}></div>
            </div>
            <div className={styles.loginDecorator}>
                <Image
                    src="/TelemedicinaLogo.png"
                    width={300}
                    height={300}
                    alt="Telemedicina imagen"
                    className={styles.loginDecorator_logo}
                />
                <Image
                    src="/TelemedicinaTitle.png"
                    width={300}
                    height={100}
                    alt="Telemedicina imagen"
                    className={styles.loginDecorator_logoTxt}
                />
            </div>
        </section>
    )
}