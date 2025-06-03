"use client";

import { useRouter } from "next/navigation";
import { login } from "@/Utils/Auth";
import { useState } from "react";
import styles from "./login.module.css";
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        correo: '',
        contrasena: ''
    });

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {

        if(formData.correo != ""  && formData.contrasena  !=  "") {

            const result = await login(formData.correo, formData.contrasena);

            if (result?.success) {
                router.push('/dashboard');
            } else {
                setError(result?.error || "Error desconocido");
            }
        } else {
            setError("Ingrese todos los campos requeridos...")
        }
        
        
    };

    return (
        <section className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.loginForm_divBorder}></div>

                <div className={styles.loginForm_divColumn}>
                    <p className={styles.loginForm_text}>Correo</p>
                    <input 
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        className={styles.loginForm_input}
                        required
                    />
                </div>
                <div className={styles.loginForm_divColumn}>
                    <p className={styles.loginForm_text}>Contraseña</p>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="contrasena"
                        value={formData.contrasena} 
                        onChange={handleChange} 
                        className={styles.loginForm_input}
                        required
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

                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.loginForm_div}>
                    <p className={styles.loginForm_smallText}>¿Has olvidado tu contraseña?</p>
                    <a 
                        className={styles.loginForm_linkText}
                        onClick={() => router.push("/recuperarCuenta")}
                    >
                        Haga click aquí
                    </a>
                </div>

                <button 
                    className={styles.loginForm_IniciarSesionnBtn}
                    onClick={handleLogin}
                >
                    <Image
                        src="/IniciarSesion.png"
                        width={300}
                        height={100}
                        alt="Botón de Iniciar Sesión"
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
                    alt="Logo de Telemedicina"
                    className={styles.loginDecorator_logo}
                />
                <Image
                    src="/TelemedicinaTitle.png"
                    width={300}
                    height={100}
                    alt="Título de Telemedicina"
                    className={styles.loginDecorator_logoTxt}
                />
            </div>
        </section>
    );
}
