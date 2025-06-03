"use client"
import { useState } from "react";
import styles from "./crearUsuario.module.css";
import { Road_Rage } from 'next/font/google';
import {Poppins} from 'next/font/google'
import { createUser } from "@/Utils/Services"

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
})

const RoadRage = Road_Rage({
  weight: '400',
  subsets: ['latin']
});

export default function CreateUsers() {

    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        contrasena: '',
        telefono: '',
        correo: '',
        fechaNacimiento: '',
        rol: '',
        direccion: '',
        cargo: '',
        activo: false,
        permisos: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked; 
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
       
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {
            cedula,
            nombre,
            apellido,
            contrasena,
            telefono,
            correo,
            fechaNacimiento,
            rol,
            direccion,
            cargo,
            activo,
            permisos
        } = formData;

        try {
            await createUser(
            cedula,
            nombre,
            apellido,
            contrasena,
            telefono,
            correo,
            fechaNacimiento,
            rol,
            direccion,
            cargo,
            activo,
            permisos
            );

            alert("✅ Usuario registrado correctamente");

            setFormData({
            cedula: '',
            nombre: '',
            apellido: '',
            contrasena: '',
            telefono: '',
            correo: '',
            fechaNacimiento: '',
            rol: '',
            direccion: '',
            cargo: '',
            activo: false,
            permisos: false
            });

        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Ocurrió un error al registrar el usuario");
        }
    };

    return (
        <section className={styles.crearUsuario}>
        <div className={`${RoadRage.className} ${styles.formLayout}`}> 
            <h1 className={styles.title}>Registrar Usuario</h1>

            <form onSubmit={handleSubmit} className={`${poppins.className} ${styles.form}`}>
            <article className={styles.noRolPreguntas}>
                <div className={styles.row}>
                    <p>Cedula</p>
                    <input  
                        className={styles.input} 
                        type="text" 
                        name="cedula" 
                        placeholder="Cédula" 
                        value={formData.cedula} 
                        onChange={handleChange} 
                        required 
                    />  
                </div>
                <div className={styles.row}>
                    <p>Nombre</p>
                    <input  
                        className={styles.input} 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className={styles.row}>
                    <p>Apellido</p>
                    <input  
                        className={styles.input} 
                        type="text" 
                        name="apellido" 
                        placeholder="Apellido" 
                        value={formData.apellido} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className={styles.row}>
                    <p>Contraseña</p>
                    <input  
                        className={styles.input} 
                        type="password" 
                        name="contrasena" 
                        placeholder="Contraseña" 
                        value={formData.contrasena}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className={styles.row}>
                    <p>Telefono</p>
                    <input  
                        className={styles.input} 
                        type="tel" 
                        name="telefono" 
                        placeholder="Teléfono" 
                        value={formData.telefono} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className={styles.row}>
                    <p>Correo</p>
                    <input  
                        className={styles.input} 
                        type="email" 
                        name="correo"
                        placeholder="Correo" 
                        value={formData.correo}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className={styles.row}>
                    <p>Fecha Nacimiento</p>
                    <input  
                        className={styles.input} 
                        type="date" 
                        name="fechaNacimiento" 
                        placeholder="Fecha de Nacimiento" 
                        value={formData.fechaNacimiento} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
            </article>
            <article className={styles.rolPreguntas}>

                <div className={styles.row}>
                    <p>Rol</p>
                    <select 
                        className={styles.input} 
                        name="rol" 
                        value={formData.rol} 
                        onChange={handleChange} 
                        required
                    >
                        
                        <option value="">Seleccione un rol</option>
                        <option value="Paciente">Paciente</option>
                        <option value="Terapeuta">Terapeuta</option>
                        <option value="Administrador">Administrador</option>

                    </select>
                </div>

                { formData.rol === "Paciente" ? (

                    <div className={styles.row}>
                        <p>Direccion</p>
                        <input  
                            className={styles.input} 
                            type="text" 
                            name="direccion" 
                            placeholder="Direccion" 
                            value={formData.direccion} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                ) : null
                }

                { formData.rol === "Terapeuta" ? (

                    <div className={styles.row}>
                        <p>Cargo</p>
                        <input  
                            className={styles.input} 
                            type="text" 
                            name="cargo" 
                            placeholder="Cargo" 
                            value={formData.cargo} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                ) : null
                }
            
                { formData.rol === "Administrador" ? (
                    <>
                        <div className={styles.row}>
                            <p>Activo</p>
                            <input  
                                className={styles.input} 
                                type="checkbox" 
                                name="activo" 
                                checked={formData.activo} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className={styles.row}>
                            <p>Permisos</p>
                            <input  
                                className={styles.input} 
                                type="checkbox" 
                                name="permisos" 
                                checked={formData.permisos} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </>
                ) : null
                } 

                <button 
                    className={styles.button}  
                    type="submit">
                        Registrar
                </button>       
            </article>
            

            </form>
        </div>
        </section>
    );
}
