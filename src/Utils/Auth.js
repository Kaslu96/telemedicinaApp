import axios from 'axios';

export const login = async (correo, contrasena) => {
  try {

    const response = await axios.post("http://localhost:5263/api/autenticacion",
      {
        Correo: correo,
        Contrasena: contrasena
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const {idUsuario, cedula, nombre, apellido, correoResponse, rol } = response.data

    const usuario = {
      cedula,
      nombre,
      apellido,
      correoResponse
    }
    localStorage.setItem("auth", "true");
    localStorage.setItem("rol", rol);
    localStorage.setItem("idUser", idUsuario.toString());
    localStorage.setItem("usuario", JSON.stringify(usuario));

    return { success: true };

  } catch (error) {
    console.error("Error en login", error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
  }

    

  export function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("rol");
    localStorage.removeItem("idUser");
    localStorage.removeItem("usuario");
  }
  
  export function isAuthenticated() {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("auth") === "true";
  }