import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Patient, Diagnosis} from "../types";
import patientService from "../services/patients";

const PatientInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const patientData = await patientService.getPatientById(id);
                setPatient(patientData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        const fetchDiagnoses = async () => {
            try {
                const diagnosisData = await patientService.getAllDiagnoses();
                setDiagnoses(diagnosisData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchPatient();
        fetchDiagnoses();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!patient) {
        return <p>Patient not found.</p>;
    }

    return (
        <div>
            <div>
                <h1>{patient.name}</h1>
                <p>ssh: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </div>
            <div>
                <h2>entries</h2>
                {patient.entries?.map((entry) => (
                    <div key={entry.id}>
                        <p>Date: {entry.date}</p>
                        <i>Description: {entry.description}</i>
                        {entry.diagnosisCodes && diagnoses && (
                            <div>
                                <p>Diagnosis Codes:</p>
                                <ul>
                                    {entry.diagnosisCodes.map((code) => {
                                        const diagnosis = diagnoses.find((diagnose) => diagnose.code === code);
                                        return (
                                            <li key={code}>
                                                {code} {diagnosis ? diagnosis.name : 'Description not found'}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PatientInfoPage;