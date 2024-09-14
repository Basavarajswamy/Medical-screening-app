import React, { useState } from 'react';

const PatientList = () => {
    // Sample data for patients
    const [patients] = useState({
        awaitingDiagnosis: [
            { id: 1, name: 'John Doe', age: 35, gender: 'Male' },
            { id: 2, name: 'Jane Smith', age: 28, gender: 'Female' }
        ],
        diagnosed: [
            { id: 3, name: 'Michael Lee', age: 45, gender: 'Male' }
        ]
    });

    return (
        <div>
            <h2>Patient List</h2>
            <div>
                <h3>Awaiting Diagnosis</h3>
                <ul>
                    {patients.awaitingDiagnosis.map((patient) => (
                        <li key={patient.id}>
                            {patient.name} - Age: {patient.age}, Gender: {patient.gender}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Diagnosed Patients</h3>
                <ul>
                    {patients.diagnosed.map((patient) => (
                        <li key={patient.id}>
                            {patient.name} - Age: {patient.age}, Gender: {patient.gender}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PatientList;
