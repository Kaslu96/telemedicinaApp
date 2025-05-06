export interface SignoVital {
    value: number | string;
    unit: string;
}
  
export interface Vitals {
    altura: SignoVital;
    peso: SignoVital;
    masaCorporal: SignoVital;
    temperatura: SignoVital;
    frecuenciaRespiratoria: SignoVital;
    presionArterial: SignoVital;
    frecuenciaCardiaca: SignoVital;
}

export interface HistoriaClinica {
    antecedentes: string;
}

export interface Paciente {
    id: number;
    name: string;
    birthdate: string; // formato YYYY-MM-DD
    age: number;
    image: string;
    vitals: Vitals;
    historiaClinica: HistoriaClinica;
}
  