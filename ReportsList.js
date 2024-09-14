import React, { useEffect, useState } from 'react';

const ReportsList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reports');
                const data = await response.json();
                setReports(data);
            } catch (err) {
                console.error(err);
                alert('Error fetching reports');
            }
        };

        fetchReports();
    }, []);

    return (
        <div>
            <h2>Diagnosis Reports</h2>
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        <span>Patient: {report.patientName}</span> -{' '}
                        <a href={report.reportUrl} download>
                            Download Report
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportsList;
