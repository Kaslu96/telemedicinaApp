import axios from 'axios';

export const getNotificaciones = async () => {
    try {
        const response = await axios.get(`http://localhost:5263/api/notificaciones`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getNotificacionesById = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/notificaciones/${userId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getPacientes = async () => {
    try {
        const response = await axios.get("http://localhost:5263/api/pacientes",
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getPacientesByID = async (pacienteId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/pacientes/${pacienteId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getSignalsByID = async (pacienteId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/signosvitales/${pacienteId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getSurveys= async () => {
    try {
        const response = await axios.get(`http://localhost:5263/api/encuestas`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const createSurvey= async (nombre, url, activo, id_Usuario) => {
    try {
        const response = await axios.post(`http://localhost:5263/api/encuestas`,
            {
                Nombre: nombre,
                Url: url,
                Activo: activo,
                Id_Usuario: id_Usuario
            },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const createUser= async (cedula, nombre, apellido, contrasena, telefono, correo, fechaNacimiento, rol, direccion = "", cargo = "", activo = null, permisos = null) => {
    try {
        const body = {
            Cedula: cedula,
            Nombre: nombre,
            Apellido: apellido,
            Contrasena: contrasena,
            Telefono: telefono,
            Correo: correo,
            FechaNacimiento: fechaNacimiento,
            Rol: rol,
            };

            if (direccion !== "") body.Direccion = direccion;
            if (cargo !== "") body.Cargo = cargo;
            if (activo !== null && cargo === "" && direccion === "") body.Activo = activo;
            if (permisos !== null && cargo === "" && direccion === "") body.Permisos = permisos;

        const response = await axios.post(`http://localhost:5263/api/usuarios`,
            body ,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getHistoriaByPatientId = async (pacienteId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/historiasclinicas/all/${pacienteId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getDiagnosticoById = async (diagnosticoId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/diagnosticos/${diagnosticoId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getTratamientosById = async (tratamientosId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/tratamientos/${tratamientosId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getMedicamentosById = async (medicamentoId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/medicamentos/${medicamentoId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getInformesById = async (historiaId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/informes/${historiaId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getAntecedentesById = async (historiaId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/antecedentes/${historiaId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getCitasById = async (pacienteId) => {
    try {
        const response = await axios.get(`http://localhost:5263/api/citas/all/${pacienteId}`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const createCita= async ({idPaciente, fecha, descripcion}) => {
    try {
        const response = await axios.post(`http://localhost:5263/api/citas`,
            {
                idPaciente,
                fecha,
                descripcion,
            },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const getMedicamentos= async () => {
    try {
        const response = await axios.get(`http://localhost:5263/api/medicamentos`,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const agregarDiagnostico= async ({idTerapeuta, idCita, nombre, descripcion}) => {
    try {
        const response = await axios.post(`http://localhost:5263/api/diagnosticos`,
            {
                idTerapeuta,
                idCita,
                nombre,
                descripcion
            },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const agregarTratamiento= async ({idDiagnostico, idMedicamento, descripcion}) => {
    try {
        const response = await axios.post(`http://localhost:5263/api/tratamientos`,
            {
                idDiagnostico,
                idMedicamento,
                descripcion,
            },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const agregarHistoriaClinica= async ({idPaciente, idDiagnostico, idTratamiento}) => {
    try {
        const response = await axios.post(`http://localhost:5263/api/historiasclinicas`,
            {
                idPaciente,
                idDiagnostico,
                idTratamiento,
            },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const agregarAntecedente= async ({idHistClin, descripcion}) => {
    try {
        const response = await axios.post(`http://localhost:5263/api/antecedentes`,
            {
                idHistClin,
                descripcion,
            },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

export const agregarInforme= async ({idHistClin, fecha, descripcion}) => {
    try {
        const response = await axios.post(`http://localhost:5263/api/informes`,
            {
                idHistClin,
                fecha,
                descripcion,
            },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data
    } catch(error) {
        console.log(error)
        return [];
    }
}

