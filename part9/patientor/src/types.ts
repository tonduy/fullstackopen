export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries?: BaseEntry[] | OccupationalHealthcareEntry | HospitalEntry;
}

export type NonSensitivePatientData = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
