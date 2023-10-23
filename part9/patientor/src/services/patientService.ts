import patientsData from "../data/patients";
import {Patient, NewPatient, Gender, NonSensitivePatient} from "../types";
import { v1 as uuid } from "uuid";

const mapGender = (gender: string): Gender => {
    if (gender === "male") return Gender.Male;
    if (gender === "female") return Gender.Female;
    if (gender === "other") return Gender.Other;
    return Gender.Other;
};

const getNonSensitivePatientsData = (): NonSensitivePatient[] => {
    return patientsData.map((patient) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: mapGender(patient.gender),
        occupation: patient.occupation,
        entries: [],
    }));
};

const getNonSensitivePatient = (id: string): NonSensitivePatient | undefined => {
    const patient = patientsData.find((p) => p.id === id);
    if (!patient) return undefined;

    const nonSensitivePatient: NonSensitivePatient = {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: mapGender(patient.gender),
        occupation: patient.occupation,
        ssn: patient.ssn,
        entries: patient.entries,
    } as NonSensitivePatient;

    return nonSensitivePatient;
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = { id, ...patient };
    patientsData.push(newPatient);
    return newPatient;
};

export default { getNonSensitivePatientsData, addPatient, getNonSensitivePatient };
